import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export default function SearchHome({
  products,
  setProductsToShow,
  toggleSearchLoading,
}) {
  const [searchInterval, setSearchInterval] = useState(false);

  // write code that sum two function

  function handelSearch(e) {
    toggleSearchLoading(true);
    if (searchInterval) {
      clearTimeout(searchInterval);
    }

    setSearchInterval(
      setTimeout(() => {
        let searchValue;
        const searchProducts = products.filter(({ id, title }) => {
          searchValue = e.target.value.toLowerCase();
          id = id.toLowerCase();
          title = title.toLowerCase();

          return id.concat(title).includes(searchValue);
          // id.concat(name).includes(e.target.value)
        });

        setProductsToShow(searchProducts);
        // TODONOW: uncomment toggleSearchLoading(false);
        toggleSearchLoading(false);
        // end loading
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
