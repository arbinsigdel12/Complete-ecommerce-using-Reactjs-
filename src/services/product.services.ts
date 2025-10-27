const API_BASE = "https://fakestoreapi.com";

export const fetchAllProducts = async () => {
  const response = await fetch(`${API_BASE}/products`);
  return response.json();
};

export const fetchProductsByCategory = async (category: string) => {
  const response = await fetch(`${API_BASE}/products/category/${category}`);
  return response.json();
};

export const fetchProductById = async (id: string) => {
  const response = await fetch(`${API_BASE}/products/${id}`);
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE}/products/categories`);
  return response.json();
};
