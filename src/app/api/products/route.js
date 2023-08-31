import { POOL } from "@/app/libs/mysql";
import { NextResponse } from "next/server";

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
    const { name, description, price, image } = Object.fromEntries(data);
    console.log(name, description, price, image);
    const result = await POOL.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
    });
    return NextResponse.json({ name, description, price, id: result.insertId });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
