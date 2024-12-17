import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  // Select the product from the Redux store
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === parseInt(id))
  );

  const addToCart = (product, quantity) => {
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

  return product ? (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.title}
            className="lg:w-1/2 w-full lg:h-auto max-h-[500px] h-64 object-contain object-center rounded"
            src={product.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-indigo-500 tracking-widest uppercase">
              {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <p className="leading-relaxed">{product.description}</p>
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
                  className="mx-1"
                >
                  -
                </button>
                <input
                  className="mx-2 border text-center w-12"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Math.min(e.target.value, product.quantity))
                    )
                  }
                  min="1"
                  max={product.quantity}
                />
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.min(prev + 1, product.quantity))
                  }
                  className="mx-1"
                >
                  +
                </button>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mr-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="text-center py-20">Loading...</div>
  );
};

export default Product;
