import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { LazyLoadImage } from "react-lazy-load-image-component";

// change this component to categoryCard and move it in component
export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  function goToCategory(id) {
    // TODO: can't pass state to subCategory to change header (h2) title
    navigate(`/categories/${id}`, {
      // replace: true,
      state: { subCategoryName: category.name },
    });
  }

  return (
    <div onClick={() => goToCategory(category._id)}>
      <Card className="mainShadow">
        <LazyLoadImage
          effect="blur"
          className="w-100 object-fit-cover object-position-center rounded-top-2"
          variant="top"
          src={category.image}
          alt="brand-img"
          height="300px"
        />

        {/* <Card.Img
          className="object-fit-cover object-position-center"
          style={{ height: "300px" }}
          variant="top"
          src={category.image}
        /> */}
        <Card.Body>
          <Card.Title className="text-center text-main fw-bold">
            {category.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
