import React, { useRef } from "react";
import { IMAGES } from "../constants/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import circlebig from "../assets/images/pattern/circle-big.svg";
import circlebig2 from "../assets/images/pattern/circle-2.svg";

const carousel = [
  { img: IMAGES.largeTestimonialPic7 },
  { img: IMAGES.largeTestimonialPic7 },
  { img: IMAGES.largeTestimonialPic7 },
];

const avtarImg = [
  { img: IMAGES.avatarLargePic1, className: "avatar1" },
  { img: IMAGES.avatarLargePic2, className: "avatar2" },
  { img: IMAGES.avatarLargePic4, className: "avatar4" },
  { img: IMAGES.avatarLargePic3, className: "avatar6" },
];
const Testimonial = () => {
  const swiperRef = useRef(null);
  return (
    <>
      <div className="swiper swiper-fade testimonial-swiper swiper-btn-lr">
        <Swiper
          className="swiper-wrapper"
          loop={true}
          speed={1300}
          ref={swiperRef}
        >
          {carousel.map((item, ind) => (
            <SwiperSlide className="swiper-slide" key={ind}>
              <div className="testimonial-1 testimonial-left">
                <div className="testimonial-pic wow fadeInUp">
                  <img src={item.img} alt="" />
                </div>
                <div className="testimonial-info wow fadeInUp">
                  <ul className="testimonial-rating justify-content-start wow fadeInUp">
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
                  <p className="testimonial-text">
                    Taking seamless key performance indicators offline to
                    maximise the long tail. Keeping your eye on the ball while
                    performing a deep dive. Completely synergize resource taxing
                    relationships via premier niche markets. Professionally
                    cultivate one-to-one customer.
                  </p>
                  <h4 className="testimonial-name">Richard Hartisona</h4>
                  <span className="testimonial-position text-primary">
                    Founder
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
          <div
            onClick={() => {
              swiperRef.current.swiper.slidePrev();
            }}
            className="testimonial-button-prev btn-prev"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div
            onClick={() => {
              swiperRef.current.swiper.slideNext();
            }}
            className="testimonial-button-next btn-next"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </div>
      </div>

      {avtarImg.map((item, ind) => (
        <div className={item.className} key={ind}>
          <img src={item.img} alt="" />
        </div>
      ))}
      <img className="svg-shape rotate-360" src={circlebig} alt="" />
      <img className="svg-shape-2 rotate-360" src={circlebig2} alt="" />
    </>
  );
};

export default Testimonial;
