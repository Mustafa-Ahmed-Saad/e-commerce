import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useContextMain } from "../../contexts/MainContext";
import { getData } from "../../helper/api";

export default function BrandCard({
  brandDetails,
  handleShow,
  handleClose,
  setBrandCardLoading,
}) {
  const { setLoading } = useContextMain();

  async function getBrand(id) {
    setBrandCardLoading(true);
    const [data, errorMessage] = await getData("/api/v1/brands/" + id);
    if (data?.data) {
      handleShow(data?.data);
    } else {
      handleClose();
      console.log(errorMessage);
    }
    setBrandCardLoading(false);
  }

  return (
    <div
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
    </div>
  );
}
