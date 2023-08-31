import Link from "next/link";

function ProductCard(product) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-300 w-[calc(100vw/6)] flex flex-col"
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-contain basis-1/3"
        />
      )}
      <div className="p-4">
        <h1 className="text-lg font-bold">{product.name}</h1>
        <h2 className="text-2xl text-slate-600">{product.price}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
