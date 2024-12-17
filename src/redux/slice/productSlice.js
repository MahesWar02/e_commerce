// src/redux/slice/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper function to load products from local storage
const loadProductsFromLocalStorage = () => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

// Helper function to save products to local storage
const saveProductsToLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: loadProductsFromLocalStorage(), // Load products from local storage
  },
  reducers: {
    setProducts(state, action) {
      // Add default quantity of 20 for each product if not already set
      state.products = action.payload.map((product) => ({
        ...product,
        quantity: product.quantity || 20,
      }));
      saveProductsToLocalStorage(state.products); // Save to local storage
    },
    updateProductStock(state, action) {
      // Reduce product stock based on checkout items
      const items = action.payload; // Array of items from the cart
      items.forEach((item) => {
        const product = state.products.find((p) => p.id === item.id);
        if (product) {
          product.quantity = Math.max(0, product.quantity - item.quantity); // Ensure quantity is not negative
        }
      });
      saveProductsToLocalStorage(state.products); // Save updated stock to local storage
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
