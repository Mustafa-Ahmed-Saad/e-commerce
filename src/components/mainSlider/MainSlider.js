import "./MainSlider.css";
import React from "react";
import Slider from "react-slick";
import sliderImg1 from "../../Assets/Images/slider-image-1.jpeg";
import sliderImg2 from "../../Assets/Images/slider-image-2.jpeg";
import sliderImg3 from "../../Assets/Images/slider-image-3.jpeg";
import asideImg1 from "../../Assets/Images/11.jpg";
import asideImg2 from "../../Assets/Images/22.jpg";

const settings = {
  dots: true,
  customPaging: function (i) {
    return <span className="dots d-inline-block rounded-3"></span>;
  },
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default function MainSlider() {
  return (
    <div className="container mt-1 mb-5" id="mainSlider">
      {/* hight in md 280px in lg unsit */}
      <div className="row">
        <div className="col-12 ps-0 mb-5 pe-0 col-md-9 col-lg-8">
          {/* main slider */}
          <Slider {...settings} className="home-slider">
            {/* img1 */}
            <div>
              <img
                width="100%"
                // style={{ height: "495px" }}
                className="object-fit-cover object-position-center"
                src={sliderImg1}
                alt="slider-img1"
              />
            </div>
            {/* img2 */}
            <div>
              <img
                width="100%"
                // style={{ height: "495px" }}
                className="object-fit-cover object-position-center"
                src={sliderImg2}
                alt="slider-img2"
              />
            </div>
            {/* img3 */}
            <div>
              <img
                width="100%"
                // style={{ height: "495px" }}
                className="object-fit-cover object-position-center"
                src={sliderImg3}
                alt="slider-img3"
              />
            </div>
          </Slider>
        </div>
        <div className="col-12 ps-0 pe-0 col-md-3 col-lg-4">
          <div className="row g-0">
            <div className="col-12 col-sm-6 col-md-12">
              <div className="bg-main w-100">
                <img width="100%" src={asideImg1} alt="aside-img1" />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-12">
              <div className="bg-main w-100">
                <img width="100%" src={asideImg2} alt="aside-img2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
