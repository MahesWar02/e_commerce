import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  // Select the product from the Redux store
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === parseInt(id))
  );

  const addToCart = (product, quantity) => {
    let token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (quantity > product.quantity) {
      alert("Quantity exceeds available stock!");
      return;
    }

    // Add item to cart
    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity,
      })
    );

    alert(`${product.title} added to cart!`);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(value, product.quantity));
    setQuantity(newQuantity);
  };

  return product ? (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.title}
            className="lg:w-1/2 w-full lg:h-auto max-h-[450px] h-64 object-contain object-center rounded"
            src={product.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font mb-2 text-indigo-500 tracking-widest uppercase">
              {product.category}
            </h2>
            <h1 className="text-gray-900  text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <p className="leading-relaxed mt-1 mb-2 text-justify">
              {product.description}
            </p>
            <p className="text-lg font-semibold text-indigo-500">
              Available Quantity: {product.quantity}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <div className="flex space-x-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="border p-2 hover:bg-gray-200"
                >
                  -
                </button>
                <input
                  className="border text-center w-12"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  min="1"
                  max={product.quantity}
                />
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.min(prev + 1, product.quantity))
                  }
                  className="border p-2 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-4">
              {product.quantity > 0 ? (
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
              ) : (
                <span className="text-red-500 font-medium">Out of stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-ring loading-lg text-indigo-600"></span>
    </div>
  );
};

export default Product;
