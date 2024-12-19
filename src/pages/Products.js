import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Category from "../components/Category";
import { productActions } from "../redux/slice/productSlice";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const products = useSelector((state) => state.products.products); // Ambil produk dari Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        dispatch(productActions.setProducts(data)); // Simpan produk ke Redux
        setFilteredProducts(data); // Set produk ke state lokal untuk pertama kali
      } catch (err) {
        setError(err.message);
        setFilteredProducts(products); // Gunakan produk dari Redux jika fetch gagal
      } finally {
        setLoading(false);
      }
    };

    if (products.length === 0) {
      // Hanya fetch jika produk di Redux kosong
      fetchProduct();
    } else {
      setFilteredProducts(products);
      setLoading(false);
    }
  }, [dispatch, products]);

  const handleCategoryClick = (category) => {
    if (category === "") {
      setFilteredProducts(products); // Reset ke semua produk
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg text-indigo-600"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Category onCategoryClick={handleCategoryClick} />
      {filteredProducts.length > 0 ? (
        <ProductCard products={filteredProducts} />
      ) : (
        <div className="text-center py-10 text-gray-500">
          No products found for this category.
        </div>
      )}
    </div>
  );
};

export default Products;
