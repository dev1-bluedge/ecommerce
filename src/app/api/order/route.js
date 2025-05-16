import dbConnect from '@/lib/dbConnect';
import { Order } from '@/lib/modals/order';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find().populate("items.productId");
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}



export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();  
    const order = new Order({ ...body });
    await order.save();

    return NextResponse.json(
      { message: "Order created successfully"},
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in POST /api/orders:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  const body = await req.json();  
 try {
    await dbConnect();

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: body.id },
      { status: body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return { error: "Order not found" };
    }

      return NextResponse.json(
      { message: "status updated successfully"},
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating order status:", error);
     return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
}
}

