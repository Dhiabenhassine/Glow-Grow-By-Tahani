import React from "react";
import { IMAGES } from "../constants/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";

const carousel = [
  {
    date: "07",
    month: "January",
    name: "By Frenchi",
    comments: "20 Comments",
    title: "Best 50 Tips For Fitness.",
    bgImg: IMAGES.overlayBoxpic1,
  },
  {
    date: "09",
    month: "February",
    name: "By aleena",
    comments: "14 Comments",
    title: "Top Diet Nutration lists.",
    bgImg: IMAGES.overlayBoxpic2,
  },
  {
    date: "04",
    month: "March",
    name: "By Johnethan",
    comments: "20 Comments",
    title: "Top 40+ Fitness Trainers",
    bgImg: IMAGES.overlayBoxpic3,
  },
  {
    date: "07",
    month: "January",
    name: "By Frenchi",
    comments: "20 Comments",
    title: "Best 50 Tips For Fitness.",
    bgImg: IMAGES.overlayBoxpic1,
  },
  {
    date: "09",
    month: "February",
    name: "By aleena",
    comments: "14 Comments",
    title: "Top Diet Nutration lists.",
    bgImg: IMAGES.overlayBoxpic2,
  },
  {
    date: "04",
    month: "March",
    name: "By Johnethan",
    comments: "20 Comments",
    title: "Top 40+ Fitness Trainers",
    bgImg: IMAGES.overlayBoxpic3,
  },
];
const OurBlog = () => {
  return (
    <>
      <div className="swiper blog-slider-2">
        <Swiper
          className="swiper-wrapper"
          slidesPerView={3}
          speed={1800}
          spaceBetween={30}
          modules={[Autoplay]}
          autoplay={{ delay: 1500 }}
          breakpoints={{
            1275: { slidesPerView: 3 },
            991: { slidesPerView: 2 },
            240: { slidesPerView: 1 },
          }}
        >
          {carousel.map((item, ind) => (
            <SwiperSlide className="swiper-slide" key={ind}>
              <div
                className="dz-card style-2 wow fadeInUp"
                style={{ backgroundImage: `url(${item.bgImg})` }}
              >
                <div className="post-date">
                  <span className="date">{item.date}</span>
                  <span className="months">{item.month}</span>
                </div>
                <div className="dz-info">
                  <div className="dz-meta">
                    <ul>
                      <li className="post-author">
                        <Link to="#">
                          <img src={IMAGES.avatar2} alt="" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                      <li className="post-comments">
                        <Link to="#">{item.comments}</Link>
                      </li>
                    </ul>
                  </div>
                  <h4 className="dz-title">
                    <Link to="/blog-details">{item.title}</Link>
                  </h4>
                  <p>
                    A wonderful serenity has taken of my entire soul, like
                    these.
                  </p>
                  <Link
                    to="/blog-details"
                    className="btn rounded-0 btn-primary btn-skew"
                  >
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="text-center m-t50">
        <Link to="/blog-list-sidebar" className="btn btn-secondary  btn-skew">
          <span>View All Feed</span>
        </Link>
      </div>
    </>
  );
};

export default OurBlog;
