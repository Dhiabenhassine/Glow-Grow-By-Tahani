import React from "react";
import { IMAGES } from "../constants/theme";
import { Link } from "react-router-dom";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const lightimg = [
  { title: "Endurance", img: IMAGES.overlayBoxpic1 },
  { title: "Conditioning", img: IMAGES.overlayBoxpic2 },
];
const lightimg2 = [
  { title: "Yoga", img: IMAGES.overlayBoxpic3 },
  { title: "Performance", img: IMAGES.overlayBoxpic4 },
];
const progressDetails = [
  { title: "SPECIFIC PREPARATION", process: "40%" },
  { title: "NUTRITION SKILLS", process: "80%" },
  { title: "75 CARDIO CONDITIONING", process: "60%" },
];
const Gallery = () => {
  return (
    <>
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="row lightgallery"
        controls={true}
      >
        {lightimg.map((item, ind) => (
          <div
            data-exthumbimage={item.img}
            data-src={item.img}
            className="col-lg-4 col-sm-6 m-b30 wow fadeInUp"
            key={ind}
          >
            <div className="ovarlay-box style-1  gallery">
              <img src={item.img} alt="" />
              <div className="content">
                <div className="ovarlay-info">
                  <Link to={item.img}>
                    <span className="view-btn lightimg">
                      <i className="fa-solid fa-plus"></i>
                    </span>
                  </Link>
                  <Link className="title" to="/services-motivation">
                    <span>{item.title}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="col-lg-4 col-sm-6 d-none d-lg-block position-relative wow fadeInUp">
          <h2 className="bg-data-text style-3">
            <span>F</span>
            <span>I</span>
            <span>T</span>
            <span>N</span>
            <span>E</span>
            <span>S</span>
            <span>S</span>
          </h2>
        </div>
        <div className="col-lg-4 col-sm-6 align-self-center m-b30 wow fadeInUp">
          <div className="content-box h-100">
            <div className="section-head style-1 m-0">
              <h2 className="title">
                My Fields Of<span> Expertise</span>
              </h2>
              <p className="p-big m-b25">
                Loren ipsum Dolor Sit Amet, Consectelur Adipiscing Elit.
                Suspendisse
              </p>
            </div>
            <Link to="/about-us" className="btn btn-skew btn-primary">
              {" "}
              <span> About Us </span>
            </Link>
          </div>
        </div>
        {lightimg2.map((item, ind) => (
          <div
            className="col-lg-4 col-sm-6 m-b30 overlay-content-box wow fadeInUp"
            key={ind}
          >
            <div className="ovarlay-box style-1">
              <img src={item.img} alt="" />
              <div className="content">
                <div className="ovarlay-info">
                  <Link to="#">
                    <span className="view-btn lightimg" title="">
                      <i className="fa-solid fa-plus"></i>
                    </span>
                  </Link>
                  <Link className="title" to="/services-health-coach">
                    <span>Yoga</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="col-lg-8 col-sm-12  m-b30 order-2 order-lg-0 wow fadeInUp">
          <div className="progress-bar-wrapper1">
            {progressDetails.map((item, indexKey) => (
              <div className="progress-bx style-1" key={indexKey}>
                <div className="progress-head">
                  <h6 className="title">{item.title}</h6>
                  <span>{item.process}</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${item.process}` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          data-exthumbimage={IMAGES.overlayBoxpic5}
          data-src={IMAGES.overlayBoxpic5}
          className="col-lg-4 col-sm-6 m-b30 wow fadeInUp"
        >
          <div className="ovarlay-box style-1">
            <img src={IMAGES.overlayBoxpic5} alt="" />
            <div className="content">
              <div className="ovarlay-info">
                <Link to="#">
                  <span
                    data-exthumbimage={IMAGES.overlayBoxpic5}
                    data-src={IMAGES.overlayBoxpic5}
                    className="view-btn lightimg"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </span>
                </Link>
                <Link className="title" to="/services-fat-loss">
                  <span>Strength</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </LightGallery>
    </>
  );
};

export default Gallery;
