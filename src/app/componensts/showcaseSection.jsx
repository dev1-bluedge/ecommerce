"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Bannercard from "./bannercard";
import AOS from "aos";
import "aos/dist/aos.css";

function ShowcaseSection() {
   useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // only animate once
    });
  }, []);
  return (
    <div>
      <div className="h-full w-full" data-aos="zoom-in-right">
        <Image
          src="/aura.webp"
          alt="showcase"
          height={500}
          width={500}
          className="object-contain w-full"
        />
      </div>
      <Bannercard
        image="/banner-2.webp"
        title="Handcrafted for Every Wrist"
        description="Easily switch your OMEGA strap for a fresh, personal touch. Match
              the season, occasion, or your mood.Explore the fun side of Swiss
              precision."
      />
    </div>
  );
}

export default ShowcaseSection;
