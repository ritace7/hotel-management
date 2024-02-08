"use client";

import { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";

type Props = {
	heroHeading: React.ReactNode;
	imageSection: React.ReactNode;
};

const ClientComponent: FC<Props> = ({ heroHeading, imageSection }) => {
	return (
		<section className="flex px-4 items-center gap-12 container mx-auto">
			<div className="py-10 h-full">
				{heroHeading}
				<div className="flex justify-between mt-12">
					<div className="flex gap-3 flex-col items-center justify-center">
						<p className="text-xs lg:text-xl text-center">Basic Rooms</p>
						<CountUpNumber duration={2000} endValue={200} />
					</div>
					<div className="flex gap-3 flex-col items-center justify-center">
						<p className="text-xs lg:text-xl text-center">Luxury Rooms</p>
						<CountUpNumber duration={2000} endValue={60} />
					</div>
					<div className="flex gap-3 flex-col items-center justify-center">
						<p className="text-xs lg:text-xl text-center">Suites</p>
						<CountUpNumber duration={2000} endValue={40} />
					</div>
				</div>
			</div>
			{imageSection}
		</section>
	);
};

export default ClientComponent;
