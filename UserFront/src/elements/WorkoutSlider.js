import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper";
import { IMAGES } from "../constants/theme";

const dataBlog = [
  {
    image: IMAGES.portfolio1,
    title: "Fitness – Workout Exercises for Fat Loss",
    changestyle: "box-1",
  },
  {
    image: IMAGES.portfolio2,
    title: "The Worst Advices We've Heard For Health.",
    changestyle: "box-2",
  },
  {
    image: IMAGES.portfolio3,
    title: "Fitness – Workout Exercises for Fat Loss",
    changestyle: "box-3",
  },
];

function WorkoutSlider() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const paginationRef = React.useRef(null);
  return (
    <>
      <Swiper
        className="swiper portfolio-slider"
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
       
        modules={[Navigation, Pagination]}
      >
        {dataBlog.map((item, ind) => (
          <SwiperSlide key={ind}>
            <div className={`dz-box style-1 ${item.changestyle}`}>
              <div className="dz-media">
                <Link to={"/portfolio-details"}>
                  <img src={item.image} alt="" />
                </Link>
              </div>
              <div className="dz-info">
                <h3 className="title">
                  <Link to={"/portfolio-details"}>{item.title}</Link>
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="container">
          <div className="num-pagination">
            <div
              className="portfolio-button-prev btn-prev dark"
              ref={navigationPrevRef}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div
              className="swiper-pagination dark style-1 m-lr-lg"
              ref={paginationRef}
            ></div>
            <div
              className="portfolio-button-next btn-next dark"
              ref={navigationNextRef}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </Swiper>
    </>
  );
}
export default WorkoutSlider;
