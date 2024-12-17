// src/redux/slice/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of products in the cart
    totalQuantity: 0, // Total number of items
    totalPrice: 0, // Total price of all items
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          category: newItem.category,
          quantity: newItem.quantity || 1, // Use quantity from payload or default 1
          totalPrice: newItem.price * (newItem.quantity || 1), // Calculate total price based on quantity
        });
        state.totalQuantity += newItem.quantity || 1;
        state.totalPrice += newItem.price * (newItem.quantity || 1);
      } else {
        existingItem.quantity += newItem.quantity || 1; // Increase quantity if item already exists
        existingItem.totalPrice += newItem.price * (newItem.quantity || 1); // Update totalPrice
        state.totalQuantity += newItem.quantity || 1;
        state.totalPrice += newItem.price * (newItem.quantity || 1);
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Reduce totalQuantity and totalPrice based on the quantity of the removed item
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;

        // Remove item from the cart
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity++;
        state.totalPrice += existingItem.price;
      }
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
