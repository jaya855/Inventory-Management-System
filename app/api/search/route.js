import dbConnect from "@/lib/dbconnect";
import Product from "@/lib/Models/Stocks";
import { NextResponse } from "next/server";

export async function GET(req){
  try{
    await dbConnect();


    const query = req.nextUrl.searchParams.get('q');
    if (!query) {
        return NextResponse.json(
            {
              success: false,
              message: "no query term available",    
            },
            { status: 400 }
          );
    }

    const products = await Product.find({ slug: new RegExp(query, 'i') });
    
        
    return NextResponse.json(
        {
          success: true,
          message: "products fetched successfully",
          prods:products

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
