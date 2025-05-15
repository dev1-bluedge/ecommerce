"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../componensts/navbar";

const schema = z.object({
  id: z.string().min(1, "Please enter your Order ID or Email"),
});

export default function Page() {
  const [status, setStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    // Simulate search (replace this with actual fetch)
    const fakeOrderFound = data.id === "123456";
    setStatus(fakeOrderFound ? "Shipped" : "Not Found");
  };

  return (
    <>
    <Navbar />  
    <div className="min-h-screen flex justify-center items-center p-2 lg:p-4">
      <div className="max-w-xl w-full bg-white p-3 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Track Your Order</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Enter your Order ID"
            {...register("id")}
          />
          {errors.query && (
            <p className="text-red-500 text-sm">{errors.id.message}</p>
          )}
          <Button type="submit" className="w-full bg-black text-white">
            Track Order
          </Button>
        </form>

        {status && (
          <Card className="mt-6 bg-gray-100">
            <CardContent className="p-4">
              {status === "Shipped" ? (
                <>
                  <p className="text-lg font-semibold text-green-600">Your order has been shipped!</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Expected delivery: within 3-5 business days.
                  </p>
                </>
              ) : (
                <p className="text-lg font-semibold text-red-500">
                  Order not found. Please check your input.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </>
  );
}
