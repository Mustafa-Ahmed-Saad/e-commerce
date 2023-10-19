import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getData } from "../../helper/api";
import SamplePrevArrow from "./../samplePrevArrow/SamplePrevArrow";
import SampleNextArrow from "./../sampleNextArrow/SampleNextArrow";
import "./HomeResponsiveSlider.css";

const settings = {
  dots: false,
  customPaging: function (i) {
    return <span className="dots d-inline-block rounded-3"></span>;
  },
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  swipeToSlide: true,
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
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
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

export default function HomeResponsiveSlider() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  function goToCategory(id) {
    navigate(`/categories/${id}`);
  }

  async function getCategories() {
    const [data, errorMessage] = await getData("/api/v1/categories");

    if (data?.data) {
      setCategories(data?.data);
    } else {
      setCategories([]);
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  let ui = null;
  if (categories?.length > 0) {
    ui = (
      <div className="container-xxl py-5" id="homeResponsiveSlider">
        <h2 className="text-center mb-2 fw-bold">Categories</h2>
        <Slider {...settings} className="HomeResponsiveSlider">
          {categories.map(({ _id, name, image }) => (
            <div
              key={_id}
              className="cursor-pointer"
              onClick={() => {
                goToCategory(_id);
              }}
            >
              <img
                className="w-100 object-position-center object-fit-cover"
                // style={{ height: "230px" }}
                src={image}
                alt="slider-img"
              />
              <h3 className="text-center fs-5 text-main">{name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return ui;
}
