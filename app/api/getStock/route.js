import dbConnect from "@/lib/dbconnect";
import Product from "@/lib/Models/Stocks";
import { NextResponse } from "next/server";

export async function GET(req){
  try{
    await dbConnect();


    const ress = await Product.find()
       
        
    return NextResponse.json(
        {
          success: true,
          message: "products fetched successfully",
          prods:ress

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
