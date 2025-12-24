import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function PhotoSlide() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
     <div className="w-screen overflow-hidden">
      <Slider {...settings}>
        <div>
          <img
            src="../images/photo1.jpg"
            alt="Slide 1"
            className="w-full h-[70vh] object-cover"
          />
        </div>

        <div>
          <img
            src="../images/photo2.jpg"
            alt="Slide 2"
            className="w-full h-[70vh] object-cover"
          />
        </div>

        <div>
          <img
            src="../images/photo3.jpg"
            alt="Slide 3"
            className="w-full h-[70vh] object-cover"
          />
        </div>
      </Slider>
    </div>
  )
}
