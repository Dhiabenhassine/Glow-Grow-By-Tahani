import React from "react";
import { IMAGES } from "../constants/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

const clientLogo = [
  { img: IMAGES.clientLogo4 },
  { img: IMAGES.clientLogo5 },
  { img: IMAGES.clientLogo6 },
  { img: IMAGES.clientLogo4 },
  { img: IMAGES.clientLogo5 },
  { img: IMAGES.clientLogo6 },
];
const Clients = () => {
  return (
    <>
      <div className="swiper clients-swiper">
        <Swiper
          slidesPerView={4}
          modules={[Autoplay]}
          speed={1500}
          loop={true}
          autoplay={{ delay: 1300 }}
          breakpoints={{
            991: { slidesPerView: 4 },
            775: { slidesPerView: 3 },
            575: { slidesPerView: 2 },
            240: { slidesPerView: 2 },
          }}
          className="swiper-wrapper"
        >
          {clientLogo.map((item, ind) => (
            <SwiperSlide className="swiper-slide wow fadeInUp" key={ind}>
              <div className="clients-logo">
                <img src={item.img} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Clients;
