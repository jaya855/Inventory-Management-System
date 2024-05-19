import dbConnect from "@/lib/dbconnect";
import User from "@/lib/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export async function POST(req){
  const secretkey =process.env.secretKey 
  try{
    await dbConnect();

    const { name, email, password } = await req.json();
    console.log({ name, email, password });

    const existingData = await User.findOne({ email });
    if (!existingData) {
      return NextResponse.json(
        {
          success: false,
          message: "User not registered",
        },
        { status: 401 }
      );
    }
    const abc=bcrypt.compare(password,existingData.password)
    if(!abc){
        return NextResponse.json(
            {
              success: false,
              message: "password is incorrect",
            },
            { status: 405 }
          );
    }
    const payload = { userId: existingData._id };
    const token = jwt.sign(payload, secretkey, { expiresIn: "1h" });

    return NextResponse.json(
        {
          success: true,
          message: "login successful",
          token:token
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
