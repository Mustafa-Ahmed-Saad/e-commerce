import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Slider from "react-slick";
import sliderImg1 from "../../Assets/Images/slider-image-1.jpeg";

const settings = {
  dots: false,
  customPaging: function (i) {
    return <span className="dots d-inline-block rounded-3"></span>;
  },
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FontAwesomeIcon
      className={className + "slick-arrow slick-next text-dark fa-5x me-2"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      icon={faArrowRight}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FontAwesomeIcon
      className={className + "slick-arrow slick-prev text-dark fa-2x me-2"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      icon={faArrowLeft}
    />
  );
}

export default function HomeResponsiveSlider() {
  return (
    <div className="container-xxl py-5">
      {/* <h2> category </h2> */}
      {/* main slider */}
      <h2 className="text-center mb-2 fw-bold">head</h2>
      <Slider {...settings} className="HomeResponsiveSlider">
        {/* img1 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
          <h3>Music</h3>
        </div>
        {/* img2 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
          <h3>Men's Fashion</h3>
        </div>
        {/* img3 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
          <h3>Women's Fashion</h3>
        </div>
        {/* img4 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
          <h3>SuperMarket</h3>
        </div>
        {/* img5 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
          <h3>Baby & Toys</h3>
        </div>
        {/* img6 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
          <h3>Home</h3>
        </div>
        {/* img7 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
          <h3>Books</h3>
        </div>
        {/* img8 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
        </div>
        {/* img9 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
        </div>
        {/* img10 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
        </div>
        {/* img11 */}
        <div>
          <img width="100%" src={sliderImg1} alt="slider-img1" />
        </div>
      </Slider>
    </div>
  );
}
