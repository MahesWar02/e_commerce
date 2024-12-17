import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice";

const CartItem = ({ cart, handleInc, handleDec }) => {
  const dispatch = useDispatch();

  const removeProduct = (id) => {
    dispatch(cartActions.removeItemFromCart(id)); // Memanggil action removeItemFromCart
  };

  return (
    <div
      className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
      key={cart.id}
    >
      <div className="flex w-2/5">
        <div className="w-20">
          <img className="h-24" src={cart.image} alt={cart.title} />
        </div>
        <div className="flex flex-col ml-4">
          <span className="font-bold text-sm">{cart.title}</span>
          <span className="text-indigo-500 mt-2 text-xs capitalize">
            {cart.category}
          </span>
        </div>
      </div>

      <div className="flex justify-center w-1/5 flex-col items-center">
        <div className="flex items-center">
          <button onClick={() => handleDec(cart.id)} className="mx-1">
            -
          </button>
          <input
            className="mx-2 border text-center w-8"
            type="text"
            readOnly
            value={cart.quantity}
          />
          <button onClick={() => handleInc(cart.id)} className="mx-1">
            +
          </button>
        </div>
        <button
          className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer mt-2"
          onClick={() => removeProduct(cart.id)}
        >
          Remove
        </button>
      </div>

      <span className="text-center w-1/5 font-semibold text-sm">
        ${cart.price}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${cart.price * cart.quantity}
      </span>
    </div>
  );
};

export default CartItem;
