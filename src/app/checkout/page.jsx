"use client";

import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartItem } from "@/lib/cart-context";
import { ScrollArea } from "@/components/ui/scroll-area";

const checkoutSchema = z.object({
  contact: z.string().min(1, "Contact is required"),
  country: z.string().min(1, "Country is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export default function CheckoutPage() {
  const { carts } = useContext(CartItem);
  const total = carts?.reduce((acc, item) => {
    return acc + item.sellprice * item.quantity;
  }, 0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data) => {
    console.log("Checkout Data:", data);
  };

  return (
    <div className="min-h-screen w-full flex justify-center p-2 lg:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-[80%] bg-white shadow-md rounded-lg p-2 lg:p-6 flex flex-col lg:flex-row-reverse gap-10"
      >
        {/* left Section - Order Summary */}
        {carts.length === 0 ? (
          <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-md">
            <h1 className="text-xl font-medium mb-4">Your cart is empty</h1>
          </div>
        ) : (
         <div className="w-full lg:w-1/2 bg-gray-50 p-3 rounded-md sticky top-6 h-fit">
            <h1 className="text-xl font-medium mb-2">Order Summary</h1>
            <ScrollArea
              className={
                "h-[30vh] w-full  rounded-md border p-2 "
              }
            >
              {carts.map((item) => (
                <div key={item.id} className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-16 h-16 object-cover mr-4 rounded-full"
                    />
                    {item.quantity && (
                      <span className="absolute top-1 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Rs.{Number(item.sellprice * item.quantity).toLocaleString("en-PK")}.00 PKR
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
              <div>
          <div className="flex justify-between text-sm">
            <p>Subtotal</p>
            <p>Rs.{Number(total).toLocaleString("en-PK")}.00 PKR</p>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <p>Shipping</p>
            <p>FREE</p>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-lg mt-2">
            <p>Total</p>
            <p className="font-semibold">
              Rs.{Number(total).toLocaleString("en-PK")}.00 PKR
            </p>
          </div>
        </div>
          </div>
        )}
      
        {/* right Section - Form */}
        <div className="w-full lg:w-1/2 space-y-6 lg:space-y-6">
          {/* Contact */}
          <h1 className="text-xl font-medium mb-4">Fill out the form</h1>

          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="lg:w-1/2 w-full space-y-1">
              <label className="text-sm font-medium">Email address</label>
              <Input placeholder="Email address" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="lg:w-1/2 w-full space-y-1">
              <label className="text-sm font-medium">Phone number</label>
              <Input
                placeholder="Mobile phone number"
                {...register("contact")}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>
          </div>

          {/* Country */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Country</label>
            <Select onValueChange={(value) => setValue("country", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pakistan">Pakistan</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* First and Last Name */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="w-full space-y-1">
              <label className="text-sm font-medium">First Name</label>
              <Input placeholder="First name" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-full space-y-1">
              <label className="text-sm font-medium">Last Name</label>
              <Input placeholder="Last name" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Address</label>
            <Input placeholder="Address" {...register("address")} />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Apartment */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Apartment, suite, etc. (optional)
            </label>
            <Input
              placeholder="Apartment, suite, etc."
              {...register("apartment")}
            />
          </div>

          {/* City and Postal Code */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="w-full space-y-1">
              <label className="text-sm font-medium">City</label>
              <Input placeholder="City" {...register("city")} />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div className="w-full space-y-1">
              <label className="text-sm font-medium">
                Postal Code (optional)
              </label>
              <Input placeholder="Postal code" {...register("postalCode")} />
            </div>
          </div>

          {/* Shipping method */}
          <div>
            <h3 className="font-semibold mb-2">Shipping method</h3>
            <div className="border border-blue-300 bg-blue-50 p-4 rounded flex justify-between items-center">
              <span>Cash On Delivery</span>
              <span className="font-bold text-sm text-gray-700">FREE</span>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-1">Payment</h3>
            <p className="text-sm text-gray-500 mb-2">
              All transactions are secure and encrypted.
            </p>
            <div className="border border-blue-300 bg-blue-50 p-4 rounded">
              Cash on Delivery (COD)
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base rounded py-3"
          >
            Complete order
          </Button>
        </div>
      </form>
    </div>
  );
}
