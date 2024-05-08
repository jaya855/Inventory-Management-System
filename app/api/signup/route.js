

import dbConnect from "@/lib/dbconnect";
import User from "@/lib/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();
    console.log({ name, email, password });

    const existingData = await User.findOne({ email });
    if (existingData) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered",
        },
        { status: 409 }
      );
    }
    const newPass=await bcrypt.hash(password,10);

    const newUser = await User.create({ name, email, password:newPass });
    return NextResponse.json(
      {
        success: true,
        message: "User registration done successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "User registration failed due to some internal server issues",
      },
      { status: 500 }
    );
  }
}