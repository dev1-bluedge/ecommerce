import React from "react";
import { Ubuntu } from "next/font/google";
import { Star } from "lucide-react";
import Image from "next/image";


const font = Ubuntu({ subsets: ["latin"], weight: "400" });

function SingleProduct({ item ,onClick }) {
  
  return (
    <div>
      <div
        key={item.id}
        className="rounded h-[45vh] md:h-[57vh] lg:h-[63vh] xl:h-[53vh]  transform transition duration-300 ease-in-out hover:scale-105"
        onClick={onClick}
      >
        <div className="relative">
          <Image
            height={300}
            width={300}
            src={item.image}
            alt={item.name}
            className="w-full h-48 md:h-68  object-cover rounded-t-2xl "
          />
          <div className="bg-black/50 px-2 py-1 rounded-md w-fit absolute bottom-2 left-2 ">
            <p className="text-white text-sm tracking-wide">Sale</p>
          </div>
        </div>
        <div className="p-3">
          <h2 className={`text-lg text-center ${font.className}`}>
            {item.name}
          </h2>
          <h2 className={`text-xs text-center ${font.className}`}>Zalvox</h2>
          <div className="flex items-center justify-center mt-2 gap-2">
            {Array(5)
              .fill()
              .map((_, i) => (
                <Star key={i} className="text-black" size={15} />
              ))}
          </div>
          <div className="flex flex-col xl:flex-row justify-evenly items-center mt-2">
            <strike className="text-gray-600 text-center ">
              RS.{Number(item.sellprice).toLocaleString("en-PK")}.00 PKR
            </strike>
            <p className="text-gray-600 text-center">RS.{Number(item.price).toLocaleString("en-PK")}.00 PKR</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
