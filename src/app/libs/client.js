import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export async function createProduct(...data) {
  return await axios.post("/api/products", data);
}
export async function updateProduct(id, data) {
  return await axios.put(`/api/products/${id}`, data);
}

export async function getProduct(...id) {
  return await axios.get(`/api/products/${id}`);
}

export async function deleteProduct(id) {
  return await axios.delete(`/api/products/${id}`);
}
