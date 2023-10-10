import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

// change this component to categoryCard and move it in component
export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  function handelLove(id) {
    // TODO: change hart icon to red and render and call api
    console.log(id);
  }

  function goToCategory(id) {
    // TODO: can't pass state to subCategory to change header (h2) title
    navigate(`/categories/${id}`, {
      replace: true,
      state: { subCategoryName: category.name },
    });
  }

  return (
    <Link to={"#"} onClick={() => goToCategory(category._id)}>
      <Card className="mainShadow">
        <Card.Img
          className="object-fit-cover object-position-center"
          style={{ height: "300px" }}
          variant="top"
          src={category.image}
        />
        <Card.Body>
          <Card.Title className="text-center text-main fw-bold">
            {category.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}
