"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";

const Header = () => {
	const { darkTheme, setDarkTheme } = useContext(ThemeContext);

	const { data: session } = useSession();

	return (
		<header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
			<div className="flex items-center w-full md:2/3">
				<Link href="/" className="font-black text-tertiary-dark">
					Velvet Escape
				</Link>
				<ul className="flex items-center ml-5">
					<li className="flex items-center">
						{session?.user ? (
							<Link href={`/users/${session.user.id}`}>
								{session.user.image ? (
									<div>
										<Image
											src={session.user.image}
											alt={session.user.name!}
											width={30}
											height={30}
											className="img scale-animation rounded-full"
										/>
									</div>
								) : (
									<FaUserCircle className="cursor-pointer" />
								)}
							</Link>
						) : (
							<Link href="/auth">
								<FaUserCircle className="cursor-pointer" />
							</Link>
						)}
					</li>
					<li className="ml-2">
						{darkTheme ? (
							<MdOutlineLightMode
								className="cursor-pointer"
								onClick={() => {
									setDarkTheme(false);
									localStorage.removeItem("hotel-theme");
								}}
							/>
						) : (
							<MdDarkMode
								className="cursor-pointer"
								onClick={() => {
									setDarkTheme(true);
									localStorage.setItem("hotel-theme", "true");
								}}
							/>
						)}
					</li>
				</ul>
			</div>

			<ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
				<li className="hover:-translate-y-2 duration-500 transition-all">
					<Link href="/">Home</Link>
				</li>
				<li className="hover:-translate-y-2 duration-500 transition-all">
					<Link href="/rooms">Rooms</Link>
				</li>
				<li className="hover:-translate-y-2 duration-500 transition-all">
					<Link href="/">Contact</Link>
				</li>
			</ul>
		</header>
	);
};

export default Header;
