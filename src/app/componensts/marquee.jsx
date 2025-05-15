"use client"
 import { useAnimate ,motion} from 'framer-motion';
 import React, { Fragment, useEffect, useRef, useState } from 'react'
 
 function Marquee() {
     const animation = useRef(null);
     const [box, setBox] = useState({
         isHover: false,
       });
       const {isHover} = box;
     const [scope, animate] = useAnimate();
     const offers = [
         "Pakistan’s #1 watches Brand Since 2007",
         "Delivery within 2-3 days",
         "Free delivery",
       ];
       useEffect(() => {
         if (animation.current) {
           if (isHover) {
             animation.current.speed = 0.4;
           } else {
             animation.current.speed = 1.5;
           }
         }
       }, [isHover]);
       useEffect(() => {
         animation.current = animate(
           scope.current,
           { x: "-50%" },
           { duration: 30, ease: "linear", repeat: Infinity }
         );
       }, []);
   return (
     <div className="w-full flex justify-center p-2 ">
     <div className="overflow-hidden w-full">
       <div className="inline-block  whitespace-nowrap ">
         <motion.div
           className="flex flex-row gap-10 items-center justify-center group"
           ref={scope}
           onMouseEnter={() => setBox({ ...box, isHover: true })}
           onMouseLeave={() => setBox({ ...box, isHover: false })}
         >
           {Array.from({ length: 2 }).map((_, index) => (
             <Fragment key={index}>
               {offers.map((item, index) => (
                 <div
                   className=" flex gap-10 justify-center items-center"
                   key={index}
                 >
                   <p className="text-[#D4AF37] text-xl">&#10038;</p>
                   <p className=" bg-gradient-to-r from-black to-black bg-clip-text text-transparent text-md font-medium">
                     {item}
                   </p>
                 </div>
               ))}
             </Fragment>
           ))}
         </motion.div>
       </div>
     </div>
   </div>
   )
 }
 
 export default Marquee