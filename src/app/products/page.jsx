import axios from "axios";
import Link from "next/link";

async function loadProducts() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
}

async function ProductPage() {
  const products = await loadProducts();

  return (
    <section className="grid grid-cols-4 gap-4 text-black">
      {products.length > 0 &&
        products.map((product) => (
          <Link
            href={`/update/${product.id}`}
            key={product.id}
            className="bg-white rounded-lg border-gray-800 mb-3 p-4"
          >
            <h1 className="text-lg font-bold">{product.name}</h1>
            <h2 className="text-2xl text-slate-600">{product.price}</h2>
            <p>{product.description}</p>
          </Link>
        ))}
    </section>
  );
}

export default ProductPage;
