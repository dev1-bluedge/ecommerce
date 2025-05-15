"use client";

import { Playfair_Display } from "next/font/google";
import { Ubuntu } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
const font = Ubuntu({ subsets: ["latin"], weight: "400" });

function Bannercard({ image, description, title, reverse }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Dynamic AOS values based on `reverse`
  const imageAos = reverse ? "fade-left" : "fade-right";
  const contentAos = reverse ? "fade-right" : "fade-left";

  return (
    <div className="w-full flex justify-center py-20">
      <div
        className={`w-[90%] lg:w-[80%] h-[80vh] flex ${
          reverse ? "flex-col-reverse lg:flex-row-reverse" : "flex-col lg:flex-row"
        } gap-4 items-center justify-center`}
      >
        <div
          className="h-full w-full lg:w-1/2 flex items-center justify-center"
          data-aos={imageAos}
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Image
            src={image}
            alt="showcase"
            height={500}
            width={500}
            className="object-contain w-full h-full rounded "
          />
        </div>
        <div
          className="h-full w-full lg:w-1/2 flex flex-col gap-3 items-center justify-center text-center"
          data-aos={contentAos}
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h1 className={`text-2xl ${playfair.className}`}>{title}</h1>
          <p className={`text-gray-500 text-md ${font.className}`}>
            {description}
          </p>
          <Button
            variant="default"
            className="bg-[#D4AF37] text-white hover:bg-[#D4AF37]/80 rounded-full px-10 py-2"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Bannercard;
