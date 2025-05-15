"use client";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/cart-context";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { FaBox, FaBoxOpen, FaPlane } from "react-icons/fa6";
import { toast } from "sonner";
import Navbar from "../componensts/navbar";

function Page() {
  const { carts, handleCartItems, IsItemAdded ,removeCartItems } = useContext(CartItem);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("TCL: Page -> id", id);
  // send item id to the server and get the single product data
  const productsdetails = [
    {
      id: 1,
      name: "Product 1",
      price: 3900,
      stock: "3",
      sellprice: 3500,
      image: "/mobile-banner.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const aftertwodays = new Date(today);
  aftertwodays.setDate(today.getDate() + 3);

  const sendToWhatsApp = () => {
    const phoneNumber = "03282183869"; // Replace with your number
    const message = encodeURIComponent(
      `Hello Zalvox, I want to order your product "${name}"`
    );
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    if (window.innerWidth < 768) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  };
  const router = useRouter();
  return (
    <>
      <Navbar />
      {productsdetails.map((product) => (
        <div
          key={product.id}
          className="w-full flex justify-center px-4 sm:px-6 lg:px-0"
        >
          <div className="flex flex-col  lg:flex-row gap-8 w-[95%] max-w-7xl py-12">
            {/* Left: Product Image */}
            <div className="w-full h-full md:w-1/2 relative transform transition duration-300 ease-in-out hover:scale-105">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="rounded-lg object-cover w-full h-auto"
              />
              <div className="bg-black/50 px-2 py-2 rounded-md w-fit absolute top-2 left-2">
                <p className="text-white text-sm tracking-wide">
                  Cash on delivery available
                </p>
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h1
                className="text-2xl font-semibold"
              >
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <span className="line-through text-red-400">
                  <p>Rs. {Number(product.price).toLocaleString("en-PK")}.00 PKR</p>
                </span>
                <span className="text-xl text-green-600 font-bold">
                  <p>Rs. {Number(product.price).toLocaleString("en-PK")}.00 PKR</p>
                </span>
                <span className="text-sm bg-black text-white px-2 py-1 rounded-lg">
                  Sale
                </span>
              </div>

              <p className="text-gray-500 text-sm">
                Shipping calculated at checkout.
              </p>

              <div className="space-y-3 flex flex-col lg:flex-row lg:gap-2">
                <Button
                  className=" border py-2 rounded w-fit cursor-pointer"
                  onClick={() => {
                    handleCartItems(product);
                    toast.success("Item added to cart", {
                      description: "Item added to cart successfully",
                      duration: 2000,
                      action: {
                        label: "Go to Cart",
                        onClick: () => router.push("/cart"),
                      },
                    });
                  } }
                >
                  {IsItemAdded(product.id)
                    ? `${IsItemAdded(product.id)} Added`
                    : "Add to Cart"}
                </Button>
                <Button
                  className=" bg-green-500 hover:bg-green-600 text-white py-2 rounded w-fit cursor-pointer"
                  onClick={() => sendToWhatsApp(product.name)}
                >
                  Order on whatsapp
                </Button>
              </div>

              <div className="mt-6 border rounded-lg shadow-sm p-4">
                <p className="text-sm text-gray-600">
                  <b>📦 Estimated Delivery time: </b>
                </p>
                <div className="flex justify-between mt-4 text-center text-xs text-gray-600 flex-wrap sm:flex-nowrap gap-4 sm:gap-0">
                  <div className="flex-1 min-w-[100px]">
                    <FaBox className="mx-auto mb-1" />
                    <p>
                      Ordered
                      <br />
                      <b>{today.toDateString()}</b>
                    </p>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <FaPlane className="mx-auto mb-1" />
                    <p>
                      Shipped
                      <br />
                      <b>{tomorrow.toDateString()}</b>
                    </p>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <FaBoxOpen className="mx-auto mb-1" />
                    <p>
                      Delivered
                      <br />
                      <b>{aftertwodays.toDateString()}</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border rounded-lg shadow-sm p-4">
                <p className="text-sm text-gray-600">
                  <b>📄 Product description</b>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Page;
