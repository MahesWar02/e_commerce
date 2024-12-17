import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { cartActions } from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const carts = useSelector((state) => state.cart.items);
  const total = useSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const dispatch = useDispatch();

  const handleInc = (id) => {
    dispatch(cartActions.incrementQuantity(id));
  };

  const handleDec = (id) => {
    dispatch(cartActions.decrementQuantity(id));
  };

  const removeProduct = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  if (carts.length === 0) {
    return (
      <div className="h-[55vh] flex justify-center items-center text-4xl">
        Cart is Empty
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10 mx-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{carts.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {carts.map((cart) => (
            <CartItem
              key={cart.id}
              cart={cart}
              handleInc={handleInc}
              handleDec={handleDec}
              removeProduct={removeProduct}
            />
          ))}
          <Link
            to={"/products"}
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            Continue Shopping
          </Link>
        </div>
        <CartSummary total={total} itemCount={carts.length} />
      </div>
    </div>
  );
};

export default CartPage;
