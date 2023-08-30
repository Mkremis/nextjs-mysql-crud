"use client";

import ProductForm from "@/app/components/ProductForm";
import { updateProduct } from "@/app/libs/client";

function UpdateProduct({ params }) {
  const { id } = params;

  return (
    <div className="flex justify-center items-center h-full">
      <ProductForm fetchData={updateProduct} id={id} />
    </div>
  );
}

export default UpdateProduct;
