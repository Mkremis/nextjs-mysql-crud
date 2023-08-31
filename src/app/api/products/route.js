import { POOL } from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dmjmadjdd",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await POOL.query("SELECT * FROM product");
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const data = await request.formData();
    const { name, description, price, image: file } = Object.fromEntries(data);
    console.log(file);
    if (!name || !description || !price || !file.size)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const pathFile = path.join(process.cwd(), "public", file.name);
    await writeFile(pathFile, buffer);
    const res = await cloudinary.uploader.upload(pathFile);
    const image = res.secure_url;
    const result = await POOL.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
      image,
    });
    console.log(result);
    return NextResponse.json({
      name,
      description,
      price,
      id: result.insertId,
      image,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
