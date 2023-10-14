import React, { useEffect, useState } from "react";
import { useContextMain } from "../../../contexts/MainContext";
import { getData } from "../../../helper/api";
import CategoryCard from "../../categoryCard/CategoryCard";
import Loading from "../../locading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const { loading, setLoading } = useContextMain();

  async function getCategories() {
    setLoading(true);
    const [data, errorMessage] = await getData("/api/v1/categories");

    if (data?.data) {
      setCategories(data?.data);
    } else {
      setCategories([]);
      console.log(errorMessage);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  let ui = <Loading />;

  if (!loading) {
    ui = (
      <div className="container my-5">
        <div className="row g-4">
          {categories?.map((category, index) => (
            <div key={category._id} className="col-4">
              {/* change thi to categoryCard */}
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return ui;
}
