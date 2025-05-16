import dbConnect from '@/lib/dbConnect';
import { Products } from '@/lib/modals/product';
import { NextResponse } from 'next/server';


export async function GET(req) {
    try {
        await dbConnect();
        const data = await Products.find();
        if (!data) {
            throw new Error("No data found");
        }
        return NextResponse.json(data, { status: 201 }, { msg: "Product fetch successfully" });


    } catch (error) {
        console.log("TCL: fetchProducts -> error", error)
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );

    }


}


export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
		console.log("TCL: POST -> body", body)
        let data = new Products({ ...body });
        await data.save();

        if (!data) {
            throw new Error("No data found");
        }

        return NextResponse.json(data, { status: 201 }, { msg: "Product created successfully" });

    } catch (error) {
        console.error("Error in POST /api/products:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        await dbConnect();
        const body = await req.json();
		console.log("TCL: PUT -> body", body)
        if (!body._id) {
            return NextResponse.json({ msg: "Id not found" });
        }
        let data = await Products.findByIdAndUpdate(body._id, { ...body });
        return NextResponse.json(data, { status: 201 }, { msg: "Product update successfully" });
    } catch (error) {
        console.error("Error in PUT /api/products:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        await dbConnect();
        const {id} = await req.json();
        console.log("TCL: DELETE -> body", id)
        if (!id) {
            return NextResponse.json({ msg: "Id not found" });
        }
        let data = await Products.findByIdAndDelete(id);
        return NextResponse.json(data, { status: 201 }, { msg: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE /api/products:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
        
    }
}