import React, { useState, useEffect } from "react";

const Category = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="flex justify-center mb-5">
      <button
        onClick={() => onCategoryClick("")}
        className="btn btn-sm btn-outline btn-primary mt-4 mx-2 hover:bg-indigo-200"
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onCategoryClick(category)}
          className="btn btn-sm btn-outline btn-primary mt-4 mx-2 hover:bg-indigo-200 hover:text-white"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;
