import React, { useEffect, useState } from "react";
import { getData } from "../../../helper/api";
import CategoryCard from "../../categoryCard/CategoryCard";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  async function getProducts() {
    const [data, errorMessage] = await getData("/api/v1/categories");

    if (data?.data) {
      setCategories(data?.data);
    } else {
      setCategories([]);
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container my-5">
      <div className="row g-4">
        {categories?.map((category, index) => (
          <div className="col-4" key={category._id}>
            {/* change thi to categoryCard */}
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}
