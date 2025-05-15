import { Button } from "@/components/ui/button";
import React from "react";
import { Playfair_Display } from "next/font/google";
import Typewriter from "typewriter-effect";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
function Banner() {
  return (
    <div
      className={`w-full lg:h-[90vh] ${playfair.className} flex flex-col lg:flex-row items-center justify-center`}
    >
      <div className="w-full h-[80vh] lg:w-1/2 flex items-center flex-col gap-3 justify-center lg:h-[80%]  text-center   md:w-1/2 p-2 ">
        <h1 className="text-5xl md:text-6xl lg:text-7xl">Make Your Signature Moments with zalvox</h1>
        <div className="w-full h-[6vh]">
          <h1 className="text-xl md:text-3xl text-[#D4AF37]">
            <Typewriter
              options={{
                strings: [
                  "Own the Moment!",
                  "Time Never Looked This Good!",
                  "Wear the Watch. Own the Style!",
                  "Luxury That Ticks!",
                  "Your Time, Your Statement!",
                  "Turn Heads, One Tick at a Time!",
                ],
                autoStart: true,
                loop: true,
                className: "",
              }}
            />
          </h1>
        </div>
        <Button variant={"default"}>Browse watches</Button>
      </div>
      <div className="w-full lg:w-1/2 h-[100vh] lg:h-full">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          src="/banner-2.mp4"
        ></video>
      </div>
    </div>
  );
}

export default Banner;
