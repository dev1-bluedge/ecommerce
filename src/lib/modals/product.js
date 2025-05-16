import mongoose from "mongoose";
const { Schema } = mongoose;

const productsSchema = new Schema(
    {
        name: String,
        price: Number,
        image: Schema.Types.Mixed,
        description: String,
        stock: String,
        sellprice: Number,
        Catagory : {type: Schema.Types.ObjectId, ref: "Catagory", required: true}

    },
    { timestamps: true } 
);

export const Products = mongoose.models.Product || mongoose.model("Product", productsSchema);
