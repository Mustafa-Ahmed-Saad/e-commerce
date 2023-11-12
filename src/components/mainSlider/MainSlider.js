import "./MainSlider.css";
import React from "react";
import Slider from "react-slick";
import sliderImg1 from "../../Assets/Images/slider-image-1.webp";
import sliderImg2 from "../../Assets/Images/slider-image-2.webp";
import sliderImg3 from "../../Assets/Images/slider-image-3.webp";
import asideImg1 from "../../Assets/Images/11.webp";
import asideImg2 from "../../Assets/Images/22.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
    <div className="container mt-4 mb-5" id="mainSlider">
      <div className="row">
        <div className="col-12 ps-0 mb-5 pe-0 col-md-9 col-lg-8">
          {/* main slider */}
          <Slider {...settings} className="home-slider">
            {/* img1 */}
            <div>
              <LazyLoadImage
                effect="blur"
                alt="slider-img1"
                // height={image.height}
                src={sliderImg1}
                width="100%"
                className="object-fit-cover object-position-center"
              />
            </div>
            {/* img2 */}
            <div>
              <LazyLoadImage
                effect="blur"
                // height={image.height}
                width="100%"
                className="object-fit-cover object-position-center"
                src={sliderImg2}
                alt="slider-img2"
              />
            </div>
            {/* img3 */}
            <div>
              <LazyLoadImage
                effect="blur"
                width="100%"
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
              <div className="w-100">
                <LazyLoadImage
                  effect="blur"
                  // height={image.height}
                  width="100%"
                  src={asideImg1}
                  alt="aside-img1"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-12">
              <div className="w-100">
                <LazyLoadImage
                  effect="blur"
                  // height={image.height}
                  width="100%"
                  src={asideImg2}
                  alt="aside-img2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
