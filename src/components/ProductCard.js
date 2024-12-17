import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ products = [] }) => {
  // Fungsi untuk membatasi jumlah kata pada title
  const truncateTitle = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto px-5 py-10">
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product) => {
            // Gunakan `products` langsung
            const { id, title, price, category, image } = product;

            return (
              <Link
                to={`/product/${id}`}
                key={id}
                className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg basis-1/5 max-w-[20%]"
              >
                <div className="block relative h-36 w-full rounded overflow-hidden">
                  <img
                    alt={title}
                    className="object-contain object-center w-full h-full"
                    src={image}
                  />
                </div>
                <div className="mt-4 text-center flex flex-col flex-grow">
                  <h3 className="text-indigo-500 text-xs tracking-widest title-font mb-1 uppercase">
                    {category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-md font-medium">
                    {truncateTitle(title, 5)}
                  </h2>
                  <p className="mt-1 text-sm mb-5">${price}</p>
                </div>
                <button className="btn btn-sm btn-outline btn-primary mt-auto mb-3 hover:bg-indigo-200">
                  Buy Now
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
