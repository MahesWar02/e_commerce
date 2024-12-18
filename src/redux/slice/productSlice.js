// src/redux/slice/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper function to load products from local storage
const loadProductsFromLocalStorage = () => {
  try {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error("Failed to load products from local storage:", error);
    return [];
  }
};

// Helper function to save products to local storage
const saveProductsToLocalStorage = (products) => {
  try {
    const uniqueProducts = products.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    ); // Ensure unique IDs
    localStorage.setItem("products", JSON.stringify(uniqueProducts));
  } catch (error) {
    console.error("Failed to save products to local storage:", error);
  }
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
    resetProducts(state) {
      // Reset all product quantities to default (20)
      state.products = state.products.map((product) => ({
        ...product,
        quantity: 20,
      }));
      saveProductsToLocalStorage(state.products); // Save reset products to local storage
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
