import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper";
import { IMAGES } from "../constants/theme";

const dataBlog = [
  { image: IMAGES.logo1 },
  { image: IMAGES.logo2 },
  { image: IMAGES.logo3 },
  { image: IMAGES.logo1 },
  { image: IMAGES.logo2 },
  { image: IMAGES.logo3 },
];

const ClientLogoSlider = () => {
  return (
    <>
      <Swiper
        className="clients-swiper"
        speed={1500}
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay]}
        breakpoints={{
          1200: {
            slidesPerView: 5,
          },
          992: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          575: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 2,
          },
        }}
      >
        {dataBlog.map((d, i) => (
          <SwiperSlide key={i}>
            <div className="clients-logo">
              <img src={d.image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ClientLogoSlider;
