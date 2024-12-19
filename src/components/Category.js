import React, { useState, useEffect } from "react";

const Category = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(""); // Menyimpan kategori aktif

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Set kategori yang sedang aktif
    onCategoryClick(category); // Panggil fungsi callback
  };

  return (
    <div className="flex justify-center mb-5">
      <button
        onClick={() => handleCategoryClick("")}
        className={`btn btn-sm mt-4 mx-2 px-4 py-2 border ${
          activeCategory === ""
            ? "bg-indigo-500 text-white"
            : "bg-white text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white"
        }`}
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(category)}
          className={`btn btn-sm mt-4 mx-2 px-4 py-2 border ${
            activeCategory === category
              ? "bg-indigo-500 text-white"
              : "bg-white text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;
