import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Category from "../components/Category";
import { productActions } from "../redux/slice/productSlice";
// Import actions Redux

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector((state) => state.products.products); // Ambil produk dari Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(productActions.setProducts(data)); // Simpan produk ke Redux
      setFilteredProducts(data); // Set produk ke state lokal untuk pertama kali
    };

    fetchProduct();
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    if (category === "") {
      setFilteredProducts(products); // Menggunakan produk dari Redux
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <Category onCategoryClick={handleCategoryClick} />
      <ProductCard products={filteredProducts} />
    </div>
  );
};

export default Products;
