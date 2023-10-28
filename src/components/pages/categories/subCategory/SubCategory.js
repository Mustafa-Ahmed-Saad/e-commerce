import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useContextMain } from "../../../../contexts/MainContext";
import { getData } from "../../../../helper/api";
import SEO from "../../../../helper/SEO";
import Loading from "../../../locading/Loading";

export default function SubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();
  const { loading, setLoading } = useContextMain();

  async function getSubCategory() {
    setLoading(true);
    const [data, errorMessage] = await getData(
      "/api/v1/categories/" + id + "/subcategories"
    );
    if (data?.data) {
      setSubCategories(data?.data);
    } else {
      setSubCategories([]);
      console.log(errorMessage);
    }
    setLoading(false);
  }

  useEffect(() => {
    getSubCategory();
  }, []);

  let ui = <Loading />;

  if (!loading) {
    ui = (
      <div className="container my-5">
        <h2 className="mb-5 text-center fw-bold text-main">
          {state?.subCategoryName ? state?.subCategoryName : "Sub Categories"}
        </h2>
        <div
          className="row g-4 align-items-center wow fadeInUp"
          data-wow-offset="10"
          data-wow-delay="0.2s"
          data-wow-iteration="1"
        >
          {subCategories?.length > 0 ? (
            subCategories?.map((subcategory) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-xl-3"
                key={subcategory._id}
              >
                <Link
                  to={`/subcategory/${subcategory._id}`}
                  className="text-black"
                >
                  <div className="mainShadow border border-2 border-dark-subtle p-3 text-center cursor-pointer text-body rounded-3">
                    <h3>{subcategory?.name}</h3>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12 text-center fw-bold">
              No Sub Categories in this category{" "}
              <Link to={"/categories"}>all categories</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={state?.subCategoryName || "Sub Categories"}
        description="Sub Category"
        facebookType="wishlist"
        twitterType="summary"
      />
      {ui}
    </>
  );
}
