"use client";
import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaBarsStaggered } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { CartItem } from "@/lib/cart-context";
function Navbar() {
  const { carts } = useContext(CartItem);
  console.log("TCL: Navbar -> carts", carts);
  const router = useRouter();
  const [box, setBox] = useState({
    isOpen: false,
  });
  const { isOpen } = box;

  return (
    <div className="sticky top-0  z-100">
      <div className="border  border-white/15  bg-neutral-950 backdrop-blur ">
        <div className="w-full p-4 flex justify-center ">
          <div className="w-full flex justify-end md:justify-between items-center h-[3vh] md:h-[6vh] rounded-3xl">
            <div className="md:flex gap-4 text-white hidden cursor-pointer">
              <Link href={"/"}>
                <p>Home</p>
              </Link>
              <Link href={"/collection"}>
                <p>Collection</p>
              </Link>
              <Link href={"/tracking"}>
                <p>Track your order</p>
              </Link>
              <Link href={"/contact"}>
                <p>Contact</p>
              </Link>
              <Link href={"/about"}>
                <p>About us</p>
              </Link>
            </div>
            <div className="md:flex gap-2 hidden ">
              <div className="relative inline-block">
                <Button
                  className="text-white font-semibold cursor-pointer"
                  onClick={() => router.push("/cart")}
                >
                  <BsCart className="text-2xl" />
                </Button>
                {
                  <span className="absolute -top-1 -right-0 bg-gray-200 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {carts?.length || 0}
                  </span>
                }
              </div>
            </div>
            <div className="md:hidden w-full">
              {isOpen ? (
                <ImCross
                  size={22}
                  color="white"
                  onClick={() => setBox({ ...box, isOpen: !isOpen })}
                />
              ) : (
                <div className="flex justify-between items-center w-full">
                  <h1 className="font-bold text-3xl text-white">Zalvox</h1>
                  <FaBarsStaggered
                    size={22}
                    color="white"
                    onClick={() => setBox({ ...box, isOpen: !isOpen })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="  overflow-hidden lg:hidden"
            >
              <div className="flex flex-col items-center justify-center  gap-4 py-2">
                <div className="flex flex-col text-center gap-4 text-gray-300 lg:hidden cursor-pointer">
                  <h1 className="font-bold text-3xl text-white">Zalvox</h1>
                  <Link href={"/"}>
                    <p>Home</p>
                  </Link>
                  <Link href={"/collection"}>
                    <p>Collection</p>
                  </Link>
                  <Link href={"/tracking"}>
                    <p>Track your order</p>
                  </Link>
                  <Link href={"/contact"}>
                    <p>Contact</p>
                  </Link>
                  <Link href={"/about"}>
                    <p>About us</p>
                  </Link>
                </div>
                <div className="relative inline-block">
                  <Button
                    className="text-white font-semibold"
                    onClick={() => router.push("/cart")}
                  >
                    <BsCart className="text-2xl" />
                  </Button>
                  {
                    <span className="absolute -top-1 -right-0 bg-gray-200 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {carts?.length || 0}
                    </span>
                  }
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;
