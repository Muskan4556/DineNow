import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative">
      <div className="h-96 relative">
        <Image
          src="https://img.freepik.com/free-photo/grilled-beef-pork-with-fresh-guacamole-generated-by-ai_188544-38177.jpg"
          alt="Indian Food"
          layout="fill"
          objectFit="cover"
          className="rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-md text-center">
            {` Welcome to India's Finest Dining`}
          </h1>
          <p className="mt-3 text-lg text-center">
            Discover authentic flavors from across the country
          </p>
          <Button
            variant="default"
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
          >
            Explore Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
