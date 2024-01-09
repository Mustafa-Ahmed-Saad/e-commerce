import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <FontAwesomeIcon
      className={className + "slick-arrow slick-next fa-5x me-2 arrows-color"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      icon={faArrowRight}
    />
  );
}
