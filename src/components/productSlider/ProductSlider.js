import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";

export default function ProductSlider({ imgUrls }) {
  const settings = {
    customPaging: function (i) {
      return (
        <span className="d-inline-block h-100">
          <LazyLoadImage
            effect="blur"
            className="w-100 h-100 object-fit-cover object-position-center"
            src={imgUrls[i]}
            alt="product-img"
          />
        </span>
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
    <div className="productSluder-un">
      <Slider {...settings} className="productSlider">
        {imgUrls?.map((imgUrl, index) => (
          <div className="overflow-hidden h-300px" key={index}>
            <LazyLoadImage
              effect="blur"
              className="w-100 h-100 object-fit-contain object-position-center"
              src={imgUrl}
              alt="product-img"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
