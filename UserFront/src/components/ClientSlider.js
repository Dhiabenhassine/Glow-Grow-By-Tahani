import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper";
import { IMAGES } from "../constants/theme";

const dataBlog = [
  { image: IMAGES.avatarlarge1 },
  { image: IMAGES.avatarlarge2 },
  { image: IMAGES.avatarlarge3 },
];

function ClientSlider() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const paginationRef = React.useRef(null);
  return (
    <>
      <Swiper
        className="testimonial-swiper"
        slidesPerView={"auto"}
        spaceBetween={0}
        loop={true}
        speed={1500}
        navigation = {{
          nextEl: '.btn-next',
          prevEl: '.btn-prev',
        }}
        pagination={{
          el: ".swiper-pagination",
          
          clickable: true,
          renderBullet: function (index, className) {            
            return (
              '<span class="' + className + '"> 0' + (index + 1) + "</span>"
            );
          },
        }}
        //autoplay= {{
        //    delay: 4500,
        //}}       
        modules={[Navigation, Pagination]}
      >
        {dataBlog.map((item, ind) => (
          <SwiperSlide key={ind}>
            <div className="testimonial-1">
              <div className="testimonial-pic">
                <img src={item.image} alt="" />
              </div>
              <ul className="testimonial-rating">
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>
                  <i className="fa-solid fa-star"></i>
                </li>
              </ul>
              <div className="testimonial-info">
                <p className="testimonial-text">
                  Taking seamless key performance indicators offline to maximise
                  the long tail. Keeping your eye on the ball while performing a
                  deep dive. Completely synergize resource taxing relationships
                  via premier niche markets. Professionally cultivate one-to-one
                  customer.
                </p>
                <h4 className="testimonial-name">Richard Hartisona</h4>
                <span className="testimonial-position text-primary">
                  Founder
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="num-pagination">
          <div
            className="testimonial-button-prev btn-prev"
            ref={navigationPrevRef}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="swiper-pagination style-1" ref={paginationRef}></div>
          <div
            className="testimonial-button-next btn-next"
            ref={navigationNextRef}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </Swiper>
    </>
  );
}
export default ClientSlider;
