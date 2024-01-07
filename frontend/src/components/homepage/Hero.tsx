import { hero } from "../../assets";
import CustomButton from "../utils/CustomButton";

const Hero = () => {
  return (
    <div className="mb-10">
      {/* 1. The cover image in the background */}
      <img
        src={hero}
        alt="Hero Cover Image"
        className="h-[500px] w-full object-cover"
      />
      {/* 2. The Slogan and start explore button */}
      <div className="absolute xs:top-1/2 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 text-center text-white font-bold">
        <h1 className="md:text-5xl sm:text-4xl text-3xl">
          Book Your Stay & Make You the Most Comfort Travel
        </h1>
        <h2 className="md:text-2xl sm:text-xl text-lg"> The best hotels for you</h2>
        <CustomButton text="Explore more" responsiveWidth="w-30" />
      </div>
    </div>
  );
};

export default Hero;
