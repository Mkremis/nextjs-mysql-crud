import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../libs/client";

async function loadProducts() {
  const { data } = await getAllProducts();
  return data;
}

async function ProductsPage() {
  const products = await loadProducts();

  return (
    <section className="grid grid-cols-4 gap-4 text-black">
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
    </section>
  );
}

export default ProductsPage;
