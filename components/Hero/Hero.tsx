import ClientComponent from "./ClientComponent";
import { heroHeading, imageSection } from "./ServerComponent";

const Hero = () => {
	return (
		<ClientComponent imageSection={imageSection} heroHeading={heroHeading} />
	);
};

export default Hero;
