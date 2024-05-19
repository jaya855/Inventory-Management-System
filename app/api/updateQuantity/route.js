import dbConnect from "@/lib/dbconnect";
import Product from "@/lib/Models/Stocks";
import { NextResponse } from "next/server";

export async function PUT(req){
  
    try {
        await dbConnect();
        const { id, type } = await req.json();
    
        if (!id || !type) {
          return NextResponse.json(
            { success: false, message: "Missing required fields" },
            { status: 400 }
          );
        }
    
        const product = await Product.findById(id);
        if (!product) {
          return NextResponse.json(
            { success: false, message: "Product not found" },
            { status: 404 }
          );
        }
        if (type === "increase") {
            product.quantity = Number(product.quantity)+1;
          } else if (type === "decrease" && product.quantity > 0) {
            product.quantity = Number(product.quantity)-1;
          } else {
            return NextResponse.json(
              { success: false, message: "Invalid operation" },
              { status: 400 }
            );
          }
          await product.save();
          return NextResponse.json(
            {
              success: true,
              message: "updated successfully",
            },
            { status: 200 }
          );
  }
  catch(e){
    return NextResponse.json(
        {
          success: false,
          message: "something went wrong,internal server error",
        },
        { status: 500 }
      );
  }
}
