import ProductForm from "@/app/components/ProductForm";

function ProductPage({ params }) {
  const { id } = params;

  return (
    <div className="flex justify-center items-center h-screen h-[calc(100vh-10rem)]">
      <ProductForm id={id} />
    </div>
  );
}

export default ProductPage;
