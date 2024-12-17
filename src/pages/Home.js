import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Mengimpor Link untuk navigasi
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log(data);
      setProducts(data.slice(0, 8)); // Batasi hanya 8 produk yang ditampilkan
    };

    fetchProduct(); // Memanggil fungsi fetchProduct untuk mendapatkan data
  }, []);

  return (
    <>
      <Hero />
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
          PRODUCT
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Recomend for U
        </h1>
      </div>

      {products.length > 0 ? (
        <ProductCard products={products} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-ring loading-lg text-indigo-600"></span>
        </div>
      )}

      {/* More Product Link */}
      <div className="text-center text-xl italic text-indigo-400 font-medium title-font mb-1 hover:text-indigo-700">
        <Link to="/products">More Product...</Link>
      </div>
    </>
  );
};

export default Home;
