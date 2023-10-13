import React from "react";
import ProductCard from "../productCard/ProductCard";

export default function ShowProducts({ products }) {
  return (
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
  );
}
