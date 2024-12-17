// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

export default store;
