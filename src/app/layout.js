import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./componensts/footer";
import Whatsappbutton from "./componensts/whatsappbutton";
import { Toaster } from "@/components/ui/sonner";

import CartProvider from "@/lib/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zalvox - Your Ultimate Shopping Destination",
  description: "Zalvox - Your Ultimate Shopping Destination",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <CartProvider>{children}</CartProvider>
        <Toaster position="top-right" />
        <Whatsappbutton />
        <Footer />
      </body>
    </html>
  );
}
