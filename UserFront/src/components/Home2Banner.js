import React from "react";
import { IMAGES } from "../constants/theme";

const Home2Banner = ({ open }) => {
  return (
    <>
      <div
        className="banner-inner"
        style={{ backgroundImage: `url(${IMAGES.SliderBg2})` }}
      >
        <h2 className="data-text">
          <span>F</span>
          <span>I</span>
          <span>T</span>
          <span>N</span>
          <span>E</span>
          <span>S</span>
          <span>S</span>
        </h2>
        <div className="container">
          <div className="banner-content">
            <h1 className="title">
              <span className="left anm wow fadeInUp">KEEP</span>
              <span className="right anm wow fadeInUp">TRAINING</span>
            </h1>
            <div className="row wow fadeInUp" data-wow-delay="0.4s">
              <div className="col-4">
                
              </div>
            </div>
          </div>
          <div className="banner-media media1 anm wow fadeInUp">
            <img src={IMAGES.team3} alt="" />
          </div>
        </div>
       {/* <div className="video-bx5">
          <Link
            onClick={() => {
              open(true);
            }}
            className="popup-youtube"
            to="#"
          >
            <img src={IMAGES.Slide2Video} alt="" />
            <span className="video-btn popup-youtube">
              <i className="fa fa-play"></i>
            </span>
          </Link>
        </div>*/}
        <img src={IMAGES.Slide2Starts} alt="" className="move-1" />
      </div>
    </>
  );
};

export default Home2Banner;
