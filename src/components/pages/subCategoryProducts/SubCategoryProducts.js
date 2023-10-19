import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContextMain } from "../../../contexts/MainContext";
import ShowProducts from "../../showProducts/ShowProducts";

export default function SubCategoryProducts() {
  const [products, setProducts] = useState([]);

  let { allAppProducts } = useContextMain();
  const { id: subCategoryId } = useParams();

  function getProducts() {
    let selectedProducts = [];
    // i want to create new array from ids of subCategories that in products.subCategory
    let productSubCategoriesIds = [];
    allAppProducts?.forEach((product) => {
      product.subcategory?.forEach((subCategory) => {
        productSubCategoriesIds.push(subCategory._id);
      });

      if (productSubCategoriesIds.includes(subCategoryId)) {
        selectedProducts.push(product);
      }
      productSubCategoriesIds = [];
    });

    // setProducts(selectedProducts);
    console.log("selectedProducts", selectedProducts);

    setProducts(selectedProducts);
  }
  useEffect(() => {
    getProducts();
  }, []);

  let ui = (
    <div className="mt-5 container text-center fw-bold">
      sorry no product in this sub category{" "}
      <Link to="/categories">all categories</Link>
    </div>
  );
  if (products.length > 0) {
    ui = (
      <div className="mt-5">
        <ShowProducts products={products} />
      </div>
    );
  }

  return ui;
}
