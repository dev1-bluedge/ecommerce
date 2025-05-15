"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "@/lib/cart-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "../componensts/navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const { carts, handleCartItems, removeCartItems, decreaseItem } =
    useContext(CartItem);
  const total = carts?.reduce((acc, item) => {
    return acc + item.sellprice * item.quantity;
  }, 0);

  return (
    <>
      <Navbar />
      <div className="px-4 py-10 max-w-6xl mx-auto relative h-screen">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <ScrollArea className="h-[60vh] w-full  rounded-md border p-2">
          <div className="flex flex-col gap-6">
            {carts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 h-[55vh]">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 text-sm">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              carts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row lg:items-center justify-between gap-4 border-b pb-4 "
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg h-[12vh]  w-[12vh]  object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Rs. {Number(item.sellprice).toLocaleString("en-PK")}.00
                        PKR
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10 justify-between ">
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => decreaseItem(item.id)}
                        className={"text-xl"}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() => handleCartItems(item)}
                        className={"text-xl"}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => removeCartItems(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-22 left-0 right-0 bg-white p-4 shadow-md">
          {carts.length > 0 && (
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xl font-bold">
                Total: Rs. {Number(total).toLocaleString("en-PK")}.00 PKR
              </div>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
