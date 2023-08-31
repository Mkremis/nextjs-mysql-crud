import { POOL } from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import cloudinary from "@/app/libs/cludinary";
import { processImage } from "@/app/libs/processImage";

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

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }
    if (!file) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }
    const filePath = await processImage(file);
    const res = await cloudinary.uploader.upload(filePath);
    const image = res.secure_url;
    if (res) {
      await unlink(filePath);
    }
    const result = await POOL.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
      image,
    });
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
