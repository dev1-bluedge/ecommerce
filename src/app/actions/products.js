"use server";

import dbConnect from "@/lib/dbConnect";
import { Order } from "@/lib/modals/order";
import { Types } from "mongoose";

export async function fetchProducts() {
  let allProducts = await fetch(`${process.env.LOCAL_URI}api/products`);
  allProducts = await allProducts.json();
  return allProducts;
}
export async function addProducts(req) {
  let addProducts = await fetch(`${process.env.LOCAL_URI}api/products`, {
    method: "POST",
    body: JSON.stringify({ ...req }),
  });
  addProducts = await addProducts.json();
  return addProducts;
}
export async function deleteProducts(id) {
  console.log("TCL: ACTION DELETE -> id", id);
  let deletedProducts = await fetch(`${process.env.LOCAL_URI}api/products`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  deletedProducts = await deletedProducts.json();
  console.log("TCL: deleteProducts -> deletedProducts", deletedProducts);
  return deletedProducts;
}

export async function updateProducts(req) {
  let updatedProducts = await fetch(`${process.env.LOCAL_URI}api/products`, {
    method: "PUT",
    body: JSON.stringify({ ...req }),
  });
  updatedProducts = await updatedProducts.json();
  return updatedProducts;
}

export async function HandleImageUpload(file) {
  const cloudName = process.env.Cloud_name;
  const apiKey = process.env.Api_key;
  const apiSecret = process.env.Api_secret;

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(timestamp, apiSecret);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Upload successful!",
        imageUrl: data.secure_url,
      };
    } else {
      console.error("Upload failed:", data.error.message);
      return {
        success: false,
        message: `Upload failed: ${data.error.message}`,
      };
    }
  } catch (error) {
    console.error("An error occurred during the upload:", error.message);
    return {
      success: false,
      message: `Error during upload: ${error.message}`,
    };
  }
}

function generateSignature(timestamp, apiSecret) {
  const crypto = require("crypto");
  return crypto
    .createHash("sha256")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
}

// orders checkout actions

export const orderCheckout = async (req) => {
  const res = await fetch(`${process.env.LOCAL_URI}api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const errText = await res.text(); // for debugging
    throw new Error(`API Error: ${res.status} - ${errText}`);
  }

  const OrderProceed = await res.json();
  return OrderProceed;
};

export const fetchOrders = async () => {
  const res = await fetch(`${process.env.LOCAL_URI}api/order`);
  return res.json();
};

export async function updateOrderStatus({ status, id }) {
  let res = await fetch(`${process.env.LOCAL_URI}api/order`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, id }),
  });

  return res.json();
}
 
export async function fetchCatagory() {
 const res = await fetch(`${process.env.LOCAL_URI}api/catagory`);
  return res.json();
}
 