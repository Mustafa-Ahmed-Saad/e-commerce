import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function SearchHome({ products, setProductsToShow }) {
  const [searchInterval, setSearchInterval] = useState(false);

  // TODO: when mouse up search after 3 seconds like count in course
  // TODO: handelSearch in home and product

  console.log(products);

  function handelSearch(e) {
    console.log(e.target.value);

    if (searchInterval) {
      clearTimeout(searchInterval);
    }

    setSearchInterval(
      setTimeout(() => {
        console.log("cascas");
        const searchProducts = products.filter(({ id, title }) => {
          let searchValue = e.target.value.toLowerCase();
          id = id.toLowerCase();
          title = title.toLowerCase();

          console.log(id.concat(title), searchValue);
          return id.concat(title).includes(searchValue);
          // id.concat(name).includes(e.target.value)
        });

        setProductsToShow(searchProducts);
        // console.log("search products", searchProducts);
        // search inproducts and if founded setProducts state with this product that match
      }, 1000)
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <Form.Control
        style={{ width: "85%", margin: "auto" }}
        size="lg"
        type="search"
        placeholder="search by name or id"
        onChange={(e) => {
          handelSearch(e);
        }}
      />
    </div>
  );
}
