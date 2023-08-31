"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../libs/client";

function ProductForm({ id = null }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "0",
    image: "",
  });
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      getProduct(id).then(({ data }) =>
        setProduct({
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
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
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      if (file) {
        formData.append("image", file);
      }

      id ? await updateProduct(id, formData) : await createProduct(formData);
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
      setMessage(error.response.data.message);
      output.current.className =
        "text-red-500 text-sm font-bold max-w-sm text-center";
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setMessage("Product deleted successfully");
        output.current.className =
          "text-green-500 text-sm font-bold max-w-sm text-center";
        setTimeout(() => {
          router.refresh();
          router.push("/products");
        }, 2000);
      } catch (error) {
        console.log(error);
        setMessage("Error deleting product");
        output.current.className =
          "text-red-500 text-sm font-bold max-w-sm text-center";
      }
    }
  };
  return (
    <form
      className="bg-white rounded-md shadow-md px-8 pt-6 pb-8 mb-4 w-2/6 flex flex-col"
      onSubmit={handleSubmit}
      ref={form}
    >
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Product Name:
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={product.name}
          autoFocus
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Price:
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          rows={3}
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Product Image:
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-4"
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      {file && (
        <img
          className="w-1/3 my-4 mx-auto object-contain"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      {product.image && !file && (
        <img
          className="w-40 my-4 mx-auto object-contain"
          src={product.image}
          alt=""
        />
      )}
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
