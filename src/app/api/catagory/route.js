import dbConnect from '@/lib/dbConnect';
import { Catagory } from '@/lib/modals/catagory';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await dbConnect();
        const data = await Catagory.find();
        if (!data) {
            throw new Error("No data found");
        }
        return NextResponse.json(data, { status: 201 }, { msg: "Catagory fetch successfully" });


    } catch (error) {
        console.log("TCL: fetchProducts -> error", error)
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );

    }


}
