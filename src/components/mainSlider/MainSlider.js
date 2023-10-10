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
    <div className="container mt-1 mb-5">
      <div className="row">
        <div className="col-8 pe-0">
          {/* main slider */}
          <Slider {...settings} className="home-slider">
            {/* img1 */}
            <div>
              <img
                width="100%"
                style={{ height: "495px" }}
                src={sliderImg1}
                alt="slider-img1"
              />
            </div>
            {/* img2 */}
            <div>
              <img
                width="100%"
                style={{ height: "495px" }}
                src={sliderImg2}
                alt="slider-img2"
              />
            </div>
            {/* img3 */}
            <div>
              <img
                width="100%"
                style={{ height: "495px" }}
                src={sliderImg3}
                alt="slider-img3"
              />
            </div>
          </Slider>
        </div>
        <div className="col-4 ps-0">
          <div className="bg-main w-100">
            <img width="100%" src={asideImg1} alt="aside-img1" />
          </div>
          <div className="bg-main w-100">
            <img width="100%" src={asideImg2} alt="aside-img2" />
          </div>
        </div>
      </div>
    </div>
  );
}
