import { createBooking, updateHotelRoom } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
	const reqBody = await req.text();
	const sig = req.headers.get("stripe-signature");
	const webhookSeret = process.env.STRIPE_WEBHOOK_SECRET;

	let event: Stripe.Event;

	try {
		if (!sig || !webhookSeret) return;

		event = stripe.webhooks.constructEvent(reqBody, sig, webhookSeret);
	} catch (error: any) {
		return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
	}

	//load event
	switch (event.type) {
		case checkout_session_completed:
			const session = event.data.object;

			const {
				metadata: {
					// @ts-ignore
					adults,
					// @ts-ignore
					children,
					// @ts-ignore
					checkinDate,
					// @ts-ignore
					checkoutDate,
					// @ts-ignore
					hotelRoom,
					// @ts-ignore
					numOfDays,
					// @ts-ignore
					user,
					// @ts-ignore
					discount,
					// @ts-ignore
					totalPrice,
				},
			} = session;

			//create booking
			await createBooking({
				adults: Number(adults),
				checkinDate,
				checkoutDate,
				children: Number(children),
				hotelRoom,
				numberOfDays: Number(numOfDays),
				discount: Number(discount),
				totalPrice: Number(totalPrice),
				user,
			});

			//update hotel room
			await updateHotelRoom(hotelRoom);

			return NextResponse.json("Booking successful", {
				status: 200,
				statusText: "Booking successful",
			});
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return NextResponse.json("Event received", {
		status: 200,
		statusText: "Event received",
	});
}
