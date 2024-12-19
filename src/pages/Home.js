import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Mengimpor Link untuk navigasi
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loader
  const [error, setError] = useState(null); // State untuk error handling

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products"); // Error jika fetch gagal
        }
        const data = await response.json();
        setProducts(data.slice(0, 8)); // Batasi hanya 8 produk yang ditampilkan
      } catch (err) {
        setError(err.message); // Simpan pesan error
      } finally {
        setLoading(false); // Set loading selesai
      }
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
          Recommended for You
        </h1>
      </div>

      {/* Kondisi untuk Loading, Error, atau Menampilkan Produk */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-ring loading-lg text-indigo-600"></span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen text-red-600">
          <p>Error: {error}</p>
        </div>
      ) : (
        <ProductCard products={products} />
      )}

      <MoreProductsLink />
    </>
  );
};

// Komponen Link ke Produk Lain
const MoreProductsLink = () => (
  <div className="text-center mb-10 text-xl italic text-indigo-500 font-medium title-font hover:text-indigo-700">
    <Link to="/products">More Products...</Link>
  </div>
);

export default Home;
