import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../constants/theme";

const serviceList = [
  { title: "Personal Training" },
  { title: "Body Building" },
  { title: "Progress Training" },
  { title: "Nutrition System" },
  { title: "HIT Workout" },
  { title: "Corrective Exercices" },
  { title: "Tailored Workout" },
  { title: "Body Toning" },
];
const AboutServices = () => {
  return (
    <>
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="dz-media p-r20">
            <div className="image-box wow fadeInUp">
              <img src={IMAGES.aboutPic5} alt="" />
              <div className="tag">
                <h2>1 2</h2>
                <h5>year experience</h5>
              </div>
            </div>
            <img src={IMAGES.aboutPic6} alt="" className="wow fadeInUp" />
          </div>
        </div>
        <AboutServicesDetails />
      </div>
    </>
  );
};

export default AboutServices;

export const AboutServicesDetails = () => {
  return (
    <>
      <div className="col-lg-6 about-content m-lg-t40 wow fadeInUp">
        <div className="section-head style-1">
          <h5 className="sub-title">WAKE UP IT’S TIME</h5>
          <h2 className="title mb-0">
            Take The <span> Action </span>
          </h2>
          <p className="description m-b10">
            Start your training with our Professional Trainers
          </p>
        </div>
        <p>
        Wake up your inner athlete and take control of your training. Whether you’re building strength, improving endurance, or learning new skills, our expert trainers will guide you every step of the way. It’s time to move, focus, and transform.
        </p>
        <ul className="pr-list list-italic m-t30 m-b35">
          {serviceList.map((item, ind) => (
            <li key={ind}>
              <i className="flaticon-check-mark"></i>
              {item.title}
            </li>
          ))}
        </ul>
        <Link
          to="/about-us"
          className="btn btn-skew btn-lg btn-primary shadow-primary"
        >
          <span>Get Started</span>
        </Link>
      </div>
    </>
  );
};
