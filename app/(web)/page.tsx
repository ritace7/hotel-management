import {
	Hero,
	PageSearch,
	Gallery,
	NewsLetter,
	FeaturedRoom,
} from "@/components";
import { getFeaturedRoom } from "@/libs/apis";

const Home = async () => {
	const featuredRoom = await getFeaturedRoom();

	return (
		<div className="px-4">
			<Hero />
			<PageSearch />
			<FeaturedRoom featuredRoom={featuredRoom} />
			<Gallery />
			<NewsLetter />
		</div>
	);
};

export default Home;
