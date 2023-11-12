import Card from "react-bootstrap/Card";
import { useGetBrand } from "../../helper/hooks/asyncFunction";

export default function BrandCard({
  brandDetails,
  handleShow,
  setBrandCardLoading,
}) {
  const { fetchBrand } = useGetBrand();

  async function getBrand(id) {
    setBrandCardLoading(true);

    const data = await fetchBrand(id);
    handleShow(data);

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
