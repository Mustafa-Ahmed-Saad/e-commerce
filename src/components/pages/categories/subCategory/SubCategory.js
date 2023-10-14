import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useContextMain } from "../../../../contexts/MainContext";
import { getData } from "../../../../helper/api";
import Loading from "../../../locading/Loading";

export default function SubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();
  const { loading, setLoading } = useContextMain();

  console.log("state.............", state);

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
        <div className="row g-4 align-items-center">
          {subCategories?.map((subcategory) => (
            <div className="col-4" key={subcategory._id}>
              <div className="mainShadow border border-2 border-black p-3 text-center cursor-pointer">
                <h3>{subcategory?.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return ui;
}
