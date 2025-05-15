"use client";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { toast } from "sonner";
function Whatsappbutton() {
  const [count, setCount] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const audio = new Audio("/ting.wav"); // Adjust the path to your sound file
        audio.play();
        setCount(true);
        toast("Need Help? We're Here for You!", {
          description: "Hey there! How can I assist you today? 😊",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      } catch (error) {
        console.log("TCL: timer -> error", error);
      }
    }, 15000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const sendToWhatsApp = () => {
    const phoneNumber = "03282183869"; // Replace with your number
    const message = encodeURIComponent("Hello, I want to take information about your products.");
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    if (window.innerWidth < 768) {
      window.location.href = url; 
    } else {
      window.open(url, "_blank");
    }
  };
  return (
    <div className="fixed bottom-8 z-100 right-6 lg:right-10 transition transform active:scale-95" onClick={sendToWhatsApp}>
      <div className="relative  bg-white  p-1.5 z-10 rounded-full">
        <IoLogoWhatsapp color="#25D366" size={50} />
        {count && (
          <div className="absolute top-1 right-0 bg-black h-5 w-5 rounded-full flex justify-center items-center">
            <p className="text-white text-xs">1</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Whatsappbutton;
