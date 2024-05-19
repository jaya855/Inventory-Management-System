import dbConnect from "@/lib/dbconnect";
import Product from "@/lib/Models/Stocks";
import { NextResponse } from "next/server";

export async function DELETE(req){
  try{
    await dbConnect();
    const id = req.nextUrl.searchParams.get('id');
    console.log("printing id")
    console.log(id)
    if (!id) {
        return NextResponse.json(
            {
              success: false,
              message: "no query term available",    
            },
            { status: 400 }
          );
    }

    const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return NextResponse.json(
            {
              success: false,
              message: "id not found",
            },
            { status: 400 }
          );
      }
    return NextResponse.json(
        {
          success: true,
          message: "product deleted succesfully",
        },
        { status:200 }
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
