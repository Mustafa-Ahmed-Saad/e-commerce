import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function ProductSlider({ imgUrls }) {
  const settings = {
    customPaging: function (i) {
      return (
        <Link>
          <img className="w-100" src={imgUrls[i]} alt="product-img" />
        </Link>
      );
    },
    dots: true,
    arrows: false,
    dotsClass: "slick-dots slick-thumb d-none d-md-block",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings} className="productSlider">
        {imgUrls?.map((imgUrl, index) => (
          <div className="overflow-hidden h-300px" key={index}>
            <img
              className="w-100 h-100 object-fit-cover object-position-center"
              src={imgUrl}
              alt="product-img"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
