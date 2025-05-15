"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Accord({ title, content }) {
   useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }, []);
  return (
    <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[80%]"  data-aos="fade-up"
     data-aos-duration="6000">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Accord;
