import React from "react";
import Form from "react-bootstrap/Form";

export default function SearchHome() {
  // TODO: when mouse up search after 3 seconds like count in course
  return (
    <div className="container mt-4 mb-5">
      <Form.Control
        style={{ width: "85%", margin: "auto" }}
        size="lg"
        type="search"
        placeholder="Large text"
      />
    </div>
  );
}
