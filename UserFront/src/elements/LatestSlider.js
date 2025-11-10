import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper";
import { IMAGES } from "../constants/theme";

const dataBlog = [
  {
    image1: IMAGES.bloggrid1,
    image2: IMAGES.avatar1,
    author: "Jone Doe",
    title: "How to keep your Body.",
    date: "17 May 2023",
  },
  {
    image1: IMAGES.bloggrid2,
    image2: IMAGES.avatar2,
    author: "Frenchi",
    title: "The Philosophy Of FITNESS.",
    date: "18 May 2023",
  },
  {
    image1: IMAGES.bloggrid3,
    image2: IMAGES.avatar3,
    author: "Bucher",
    title: "Best 50 Tips For FITNESS.",
    date: "17 May 2023",
  },
];

function changeItemBoxed() {
  let bodyClass = document.body.classList;
  
  if (bodyClass.contains === "boxed") {
    return 3;
  } else {
    return 4;
  }
}

function LatestSlider() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const paginationRef = React.useRef(null);
  return (
    <div className="container">
      <div className="row justify-content-between align-items-center m-b10">
        <div className="col-xl-7">
          <div className="section-head text-center text-md-start">
            <h2 className="title">
              Latest <span>News Feed</span>
            </h2>
          </div>
        </div>
        <div className="col-xl-5 text-md-end d-flex align-items-center justify-content-xl-end justify-content-sm-between justify-content-center m-sm-b30 m-b40">
          <div className="num-pagination">
            <div className="swiper-blog-prev btn-prev" ref={navigationPrevRef}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div
              className="swiper-blog-pagination1 swiper-pagination style-1"
              ref={paginationRef}
            ></div>
            <div className="swiper-blog-next btn-next" ref={navigationNextRef}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <Link
            to={"/blog-grid"}
            className="btn btn-primary btn-skew d-none d-sm-block"
          >
            <span>Show All</span>
          </Link>
        </div>
      </div>
      <Swiper
        className="swiper blog-slider-full blog-slider-wrapper"
        centeredSlides={true}
        slidesPerView={changeItemBoxed()}
        spaceBetween={30}
        loop={true}
        speed={1500}
        autoplay={{
          delay: 3000,
        }}
        navigation = {{
          nextEl: '.btn-next',
          prevEl: '.btn-prev',
        }}
        pagination={{
          el: ".swiper-blog-pagination1",
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + '"> 0' + (index + 1) + "</span>"
            );
          },
        }}
        // onSwiper={(swiper) => {
        //   setTimeout(() => {
        //     swiper.params.navigation.prevEl = navigationPrevRef.current;
        //     swiper.params.navigation.nextEl = navigationNextRef.current;
        //     swiper.navigation.destroy();
        //     swiper.navigation.init();
        //     swiper.navigation.update();
        //   });
        // }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          1200: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          320: {
            slidesPerView: 1,
            centeredSlides: false,
          },
        }}
      >
        {dataBlog.map((item, ind) => (
          <SwiperSlide key={ind}>
            <div className="dz-card style-1 overlay-shine">
              <div className="dz-media">
                <Link to={"/blog-details"}>
                  <img src={item.image1} alt="" />
                </Link>
              </div>
              <div className="dz-info">
                <div className="dz-meta">
                  <ul>
                    <li className="post-author">
                      <Link to={"#"}>
                        <img src={item.image2} alt="" />
                        <span>By {item.author}</span>
                      </Link>{" "}
                    </li>
                    <li className="post-date">
                      <Link to={"#"}> {item.date}</Link>
                    </li>
                  </ul>
                </div>
                <h4 className="dz-title">
                  <Link to={"/blog-details"}>{item.title}</Link>
                </h4>
                <p>
                  A wonderful serenity has taken of my entire soul, like these.
                </p>
                <Link to={"/blog-details"} className="btn btn-primary btn-skew">
                  <span>Read More</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default LatestSlider;
