"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { deleteProduct, getProduct } from "../libs/client";

function ProductForm({ fetchData, id = null }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "0",
  });
  const [message, setMessage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      getProduct(id).then(({ data }) =>
        setProduct({
          name: data.name,
          description: data.description,
          price: data.price,
        })
      );
    }
  }, [id]);

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
    () => clearTimeout(timer);
  }, [message]);

  const form = useRef();
  const output = useRef();

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetchData(id, product);

      setProduct({ name: "", description: "", price: "0" });
      form.current.reset();
      id
        ? setMessage("Product updated successfully")
        : setMessage("Product added successfully");
      output.current.className =
        "text-green-500 text-sm font-bold max-w-sm text-center";
      setTimeout(() => {
        router.refresh();
        router.push("/products");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage("Error adding product");
      output.current.className =
        "text-red-500 text-sm font-bold max-w-sm text-center";
    }
  };

  const handleDelete = async () => {
    const { data } = await deleteProduct(id);
    console.log(data);
    setMessage("Product deleted successfully");
    output.current.className =
      "text-green-500 text-sm font-bold max-w-sm text-center";
    setTimeout(() => {
      router.refresh();
      router.push("/products");
    }, 2000);
  };

  return (
    <form
      className="bg-white rounded-md shadow-md px-8 pt-6 pb-8 mb-4 flex flex-col"
      onSubmit={handleSubmit}
      ref={form}
    >
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Product Name:
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={product.name}
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Price:
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="price"
          placeholder="00.00"
          onChange={handleChange}
          value={product.price}
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Description:
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
      </label>
      <output ref={output}>{message}</output>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Product
        </button>
        {id && (
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
