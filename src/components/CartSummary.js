import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../redux/slice/cartSlice";
import { productActions } from "../redux/slice/productSlice";

const CartSummary = ({ total, itemCount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong! Silakan tambahkan produk terlebih dahulu.");
      return;
    }

    // Update product stock based on cart items
    dispatch(productActions.updateProductStock(cartItems));

    // Save checkout details to local storage
    localStorage.setItem("checkoutDetails", JSON.stringify(cartItems));

    // Clear the cart
    dispatch(cartActions.clearCart());

    // Redirect to the home page and show success alert
    alert("Checkout success");
    navigate("/");
  };

  return (
    <div className="w-1/4 bg-white px-10 py-10">
      <h2 className="font-semibold text-2xl">Cart Summary</h2>
      <div className="mt-5">
        <p className="text-lg">Items: {itemCount}</p>
        <p className="text-lg">Total: ${total}</p>
      </div>
      <button
        onClick={handleCheckout} // Call handleCheckout when button is clicked
        className="mt-10 bg-indigo-500 text-white py-2 px-4 w-full"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
