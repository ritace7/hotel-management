"use client";

import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
	price: number;
	discount: number;
	specialNote: string;
	checkinDate: Date | null;
	setCheckinDate: Dispatch<SetStateAction<Date | null>>;
	checkoutDate: Date | null;
	setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
	calcMinCheckoutDate: () => Date | null;
	adults: number;
	numOfChildren: number;
	setAdults: Dispatch<SetStateAction<number>>;
	setNumOfChildren: Dispatch<SetStateAction<number>>;
	isBooked: boolean;
	handleBookNow: () => void;
};

const BookRoomCta: FC<Props> = ({
	price,
	discount,
	specialNote,
	checkinDate,
	setCheckinDate,
	checkoutDate,
	setCheckoutDate,
	calcMinCheckoutDate,
	adults,
	numOfChildren,
	setAdults,
	setNumOfChildren,
	isBooked,
	handleBookNow,
}) => {
	const discountPrice = price - (price / 100) * discount;

	const calcNumOfDays = () => {
		if (!checkinDate || !checkoutDate) return 0;
		const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
		const numOfDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));
		return numOfDays;
	};

	return (
		<div className="px-7 py-6">
			<h3>
				<span
					className={`${
						discount ? "text-gray-400 line-through" : ""
					} font-bold text-xl`}
				>
					${price}
				</span>
				{discount ? (
					<span className="font-bold text-xl">
						{" "}
						| Special: {discount}% Off. Now Only{" "}
						<span className="text-tertiary-dark">${discountPrice}</span>
					</span>
				) : (
					<></>
				)}
			</h3>
			<div className="w-full border-b-2 border-b-secondary my-2" />

			<h4 className="my-8">{specialNote}</h4>
			<div className="flex">
				<div className="w-1/2 pr-2">
					<label
						htmlFor="check-in-date"
						className="block text-sm font-medium text-gray-900 dark:text-gray-400"
					>
						Check-in Date
					</label>
					<DatePicker
						selected={checkinDate}
						onChange={(date) => setCheckinDate(date)}
						dateFormat="dd/MM/yyyy"
						minDate={new Date()}
						id="check-in-date"
						className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
					/>
				</div>
				<div className="w-1/2 pl-2">
					<label
						htmlFor="check-out-date"
						className="block text-sm font-medium text-gray-900 dark:text-gray-400"
					>
						Check-out Date
					</label>
					<DatePicker
						selected={checkoutDate}
						onChange={(date) => setCheckoutDate(date)}
						dateFormat="dd/MM/yyyy"
						disabled={!checkinDate}
						minDate={calcMinCheckoutDate()}
						id="check-out-date"
						className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
					/>
				</div>
			</div>
			<div className="flex mt-4">
				<div className="w-1/2 pr-2">
					<label
						htmlFor="adults"
						className="block text-sm font-medium text-gray-900 dark:text-gray-400"
					>
						Adults
					</label>
					<input
						type="number"
						id="adults"
						value={adults}
						min={1}
						max={5}
						onChange={(e) => setAdults(+e.target.value)}
						className="w-full border text-black border-gray-300 rounded-lg p-2.5"
					/>
				</div>
				<div className="w-1/2 pl-2">
					<label
						htmlFor="children"
						className="block text-sm font-medium text-gray-900 dark:text-gray-400"
					>
						Children
					</label>
					<input
						type="number"
						id="children"
						value={numOfChildren}
						min={0}
						max={3}
						onChange={(e) => setNumOfChildren(+e.target.value)}
						className="w-full border text-black border-gray-300 rounded-lg p-2.5"
					/>
				</div>
			</div>
			{calcNumOfDays() > 0 ? (
				<p className="mt-3">Total Price: ${calcNumOfDays() * discountPrice}</p>
			) : (
				<></>
			)}
			<button
				disabled={isBooked}
				onClick={handleBookNow}
				className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
			>
				{isBooked ? "Booked" : "Book Now"}
			</button>
		</div>
	);
};

export default BookRoomCta;
