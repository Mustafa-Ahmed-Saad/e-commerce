import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { getData } from "../../helper/api";

export default function BrandCard({ brandDetails, handleShow, handleClose }) {
  async function getBrand(id) {
    const [data, errorMessage] = await getData("/api/v1/brands/" + id);
    if (data?.data) {
      handleShow(data?.data);
    } else {
      console.log(errorMessage);
      handleClose();
    }
  }

  return (
    <>
      <Link
        to={"#"}
        onClick={() => {
          getBrand(brandDetails._id);
        }}
      >
        <Card className="mainShadow">
          <Card.Img variant="top" src={brandDetails.image} />
          <Card.Body>
            <Card.Title className="text-center">{brandDetails.name}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}
