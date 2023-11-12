import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PopUp({ show, handleClose, poPupBrand }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row align-items-center flex-column flex-sm-row">
            <div className="col-12 col-sm-5 fw-bold text-main fs-2">
              {poPupBrand?.name}
            </div>
            <div className="col-12 col-sm-7">
              <LazyLoadImage
                effect="blur"
                className="w-100"
                src={poPupBrand?.image}
                alt="brand-img"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
