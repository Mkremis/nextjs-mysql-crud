import { POOL } from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await POOL.query("SELECT * FROM product WHERE id = ?", [id]);

    if (result.length === 0)
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );

    return NextResponse.json(result[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { id } = params;
    const result = await POOL.query("UPDATE product SET ? WHERE id = ?", [
      data,
      id,
    ]);

    if (result.affectedRows === 0)
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    const updatedProduct = await POOL.query(
      "SELECT * FROM product WHERE id = ?",
      [id]
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await POOL.query("DELETE FROM product WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
