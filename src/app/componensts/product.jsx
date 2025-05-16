import React from "react";
import SingleProduct from "./SingleProduct";
import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import { Description } from "@radix-ui/react-dialog";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

function ProductSection() {
  const router = useRouter();
  const products = [
    {
      id: 1,
      name: "Product 1",
      amount: 3900,
      image: "/mobile-banner.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      stock: "3",
      sellprice: 3500,
    },

    {
      id: 1,
      name: "Product 1",
      price: 3900,
      stock: "3",
      sellprice: 3500,
      image: "/mobile-banner.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },

    {
      id: 1,
      name: "Product 1",
      price: 3900,
      stock: "3",
      sellprice: 3500,
      image: "/mobile-banner.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 1,
      name: "Product 1",
      price: 3900,
      stock: "3",
      sellprice: 3500,
      image: "/mobile-banner.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="py-10">
      <h1
        className={`${playfair.className} text-3xl text-center text-[#D4AF37]`}
      >
        Signature Selections
      </h1>
      <div className="w-full flex justify-center">
        <div className="lg:w-full xl:w-[90%] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-10 py-6 lg:gap-y-3 gap-2 md:gap-4 flex-wrap px-2 lg:px-20 ">
          {products.map((item, index) => (
            <SingleProduct
              key={index}
              item={item}
              onClick={() => {
                const params = new URLSearchParams({
                  id: item.id.toString(),
                });
                router.push(`/productdetail?${params.toString()}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSection;
