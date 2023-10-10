import React from "react";
import WishListContextProvider from "../../contexts/WishListContext";
import ProductCard from "../productCard/ProductCard";

export default function ShowProducts({ products }) {
  return (
    <WishListContextProvider>
      <div className="container">
        <div className="row gx-2 gy-4">
          {products.length > 0
            ? products.map((product, index) => (
                <div className="col-3" key={index}>
                  <ProductCard product={product} />
                </div>
              ))
            : null}
        </div>
      </div>
    </WishListContextProvider>
  );
}
