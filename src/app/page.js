"use client";
import React from "react";
import Marquee from "./componensts/marquee";
import Banner from "./componensts/banner";
import DiagonalMarquee from "./componensts/DiagonalMarquee";
import Line from "./componensts/line";
import Accord from "./componensts/accordion";
import { Playfair_Display } from "next/font/google";
import Navbar from "./componensts/navbar";
import ProductSection from "./componensts/product";
import ShowcaseSection from "./componensts/showcaseSection";
import Bannercard from "./componensts/bannercard";
import OfferAlert from "./componensts/offeralert";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
function Page() {
  return (
    <div className="bg-white">
      <OfferAlert />
      <Marquee />
      <Navbar />
      <Banner />
      <ProductSection />
      <ShowcaseSection />
      <div
        className={
          " h-[70vh] bg-white  w-full   overflow-hidden flex flex-col md:gap-12 gap-6 items-center justify-center"
        }
      >
        <DiagonalMarquee
          marquees={"animate-marquee2 space-x-16"}
          deg={"rotate-[-5deg]"}
          classNames={" bg-black z-50"}
        />
        <DiagonalMarquee
          deg={"rotate-[7deg] md:rotate-[5deg]"}
          marquees={"animate-marquee  space-x-2"}
          borderprops={
            "border-2 border-black p-3 md:p-8 rounded-full text-black"
          }
          classNames={" z-10"}
        />
      </div>
      <Line />
      <Bannercard
        image="/banner-3.webp"
        title="REDEFINE TIME WITH ROLEX ELEGANCE"
        description="Change how the world sees you — one tick at a time. Whether it's a power move or a personal moment,
        a Rolex elevates every occasion with timeless precision and prestige"
        reverse={true}
      />
      <div className=" flex items-center justify-center h-[60vh] flex-col">
        <h1
          className={`${playfair.className} text-4xl font-bold text-[#D4AF37] mb-3`}
        >
          Have a question?{" "}
        </h1>
        <Accord
          title="Is the watch original and authentic?"
          content="Yes, all our watches are 100% original and come with brand authentication or warranty where applicable."
        />
        <Accord
          title="Is Cash on Delivery (COD) available?"
          content="Yes, we offer Cash on Delivery (COD) across Pakistan for your convenience."
        />
        <Accord
          title="How long will delivery take?"
          content="Orders are usually delivered within 3–5 working days. Delivery times may vary by location."
        />
        <Accord
          title="Can I return or exchange the watch?"
          content="Yes, we offer a 7-day return/exchange policy for unused items in original packaging. Terms apply."
        />
        <Accord
          title="Will I receive the exact same watch shown in pictures?"
          content="Yes, what you see is what you get. All photos are of the actual product or brand-authorized images."
        />
        <Accord
          title="Do you offer warranty?"
          content="Some watches come with a manufacturer or store warranty. Check the product details or ask our support team."
        />
        <Accord
          title="Is the strap adjustable?"
          content="Yes, most metal strap watches are adjustable. Leather or rubber straps come with standard holes for fitting."
        />
        <Accord
          title="Do you offer gift wrapping?"
          content="Yes, we offer complimentary gift packaging. You can request it at checkout."
        />
      </div>
    </div>
  );
}

export default Page;
