"use client";

import ProductForm from "../components/ProductForm";
import { createProduct } from "../libs/client";

function NewPage() {
  return (
    <div className="flex justify-center items-center h-full">
      <ProductForm fetchData={createProduct} />
    </div>
  );
}

export default NewPage;
