import { getRoom } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2023-10-16",
});

type RequestData = {
	checkinDate: string;
	checkoutDate: string;
	adults: number;
	children: number;
	numOfDays: number;
	hotelRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
	const {
		checkinDate,
		adults,
		checkoutDate,
		children,
		hotelRoomSlug,
		numOfDays,
	}: RequestData = await req.json();

	if (
		!checkinDate ||
		!checkoutDate ||
		!adults ||
		!hotelRoomSlug ||
		!numOfDays
	) {
		return new NextResponse("All fields are required.", { status: 400 });
	}

	const origin = req.headers.get("origin");
	const session = await getServerSession(authOptions);

	if (!session) {
		return new NextResponse("Authentication required", { status: 400 });
	}

	const userId = session.user.id;
	const formattedCheckinDate = checkinDate.split("T")[0];
	const formattedCheckoutDate = checkoutDate.split("T")[0];

	try {
		const room = await getRoom(hotelRoomSlug);
		const discountPrice = room.price - (room.price / 100) * room.discount;
		const totalPrice = discountPrice * numOfDays;

		//Stripe Payment
		const stripeSession = await stripe.checkout.sessions.create({
			mode: "payment",
			line_items: [
				{
					quantity: 1,
					price_data: {
						currency: "aud",
						product_data: {
							name: room.name,
							images: room.images.map((image) => image.url),
						},
						unit_amount: parseInt((totalPrice * 100).toString()),
					},
				},
			],
			payment_method_types: ["card"],
			success_url: `${origin}/users/${userId}`,
			metadata: {
				adults,
				children,
				checkinDate: formattedCheckinDate,
				checkoutDate: formattedCheckoutDate,
				hotelRoom: room._id,
				numOfDays,
				user: userId,
				dicount: room.discount,
				totalPrice,
			},
		});

		return NextResponse.json(stripeSession, {
			status: 200,
			statusText: "Payment session created",
		});
	} catch (error: any) {
		console.log("Payment Failed", error);
		return new NextResponse(error, { status: 500 });
	}
}
