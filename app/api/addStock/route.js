import dbConnect from "@/lib/dbconnect";
import Product from "@/lib/Models/Stocks";
import { NextResponse } from "next/server";

export async function POST(req){
  try{
    await dbConnect();
    const addData = await req.json();
    const {slug,price,quantity}=addData;
    console.log({slug,price,quantity})

    const ress = await Product.create({ slug,price,quantity });
       
        
    return NextResponse.json(
        {
          success: true,
          message: "product addedd successfully successful",
        },
        { status: 201 }
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
