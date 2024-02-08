import Link from "next/link";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

const Footer = () => {
	return (
		<footer className="mt-16">
			<div className="container mx-auto px-4">
				<Link href="/" className="font-black text-tertiary-dark">
					Velvet Escape
				</Link>

				<h4 className="font-semibold text-[40px] py-6">Contact</h4>
				<div className="flex flex-wrap gap-16 items-center justify-between">
					<div className="flex-1">
						<p>123 Serenity Street, Tranquilville</p>
						<div className="flex items-center py-4">
							<BsFillSendFill />
							<p className="ml-2">info@velvetescapehotel.com</p>
						</div>
						<div className="flex items-center">
							<BsTelephoneOutbound />
							<p className="ml-2">+61 2 1234 5678</p>
						</div>
						<div className="flex items-center pt-4">
							<BiMessageDetail />
							<p className="ml-2">+61 2 9876 5432</p>
						</div>
					</div>

					<div className="flex-1 md:text-right">
						<p className="pb-4">Our Story</p>
						<p className="pb-4">Get in Touch</p>
						<p className="pb-4">Privacy Policy</p>
						<p className="pb-4">Terms of service</p>
						<p>Customer Assistance</p>
					</div>

					<div className="flex-1 md:text-right">
						<p className="pb-4">Dining Experience</p>
						<p className="pb-4">Wellness</p>
						<p className="pb-4">Fitness</p>
						<p className="pb-4">Sports</p>
						<p>Events</p>
					</div>
				</div>
			</div>

			<div className="bg-tertiary-light flex items-center justify-end h-10 md:h-[70px] mt-16 w-full bottom-0 left-0">
				<div className="footer-page-end">
					&copy; Created By
					<Link
						href="https://www.linkedin.com/in/hritesh7/"
						target="_blank"
						rel="noreferrer"
						className="mx-2 font-pixelify text-2xl text-primary"
					>
						RITACE
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
