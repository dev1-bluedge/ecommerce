import mongoose, { Schema, model, models } from "mongoose";

// Define the item schema
const itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

// Define the order schema
const OrderSchema = new Schema(
  {
    items: [itemSchema],
    totalAmount: { type: Number, required: true },
    user: {
      contact: String,
      country: String,
      firstName: String,
      lastName: String,
      address: String,
      apartment: String,
      city: String,
      postalCode: String,
      email: { type: String, required: true },
    },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled','shipped'], default: 'pending' },
  },
  { timestamps: true }
);

// Export the model
export const Order = models.Order || model("Order", OrderSchema);
