import React, { useEffect, useState } from "react";
import { useContextMain } from "../../../contexts/MainContext";
import { getData } from "../../../helper/api";
import SEO from "../../../helper/SEO";
import CategoryCard from "../../categoryCard/CategoryCard";
import Loading from "../../locading/Loading";
import WOW from "wow.js";

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
      <>
        <SEO
          title="Categories"
          description="Category of Ecommerce App"
          facebookType="website"
          twitterType="summary"
        />
        <div className="container my-5">
          <div
            className="row g-4 wow fadeInDown"
            data-wow-offset="10"
            data-wow-delay="0.2s"
            data-wow-iteration="1"
          >
            {categories?.map((category, index) => (
              <div
                key={category._id}
                className="col-12 col-md-6 col-lg-4 col-xl-3"
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  return ui;
}
