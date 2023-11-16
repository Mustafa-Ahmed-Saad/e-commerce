import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FontAwesomeIcon
      className={className + "slick-arrow slick-prev text-body fa-2x me-2"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      icon={faArrowLeft}
    />
  );
}
