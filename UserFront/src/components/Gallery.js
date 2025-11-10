import React from "react";
import { Link } from "react-router-dom";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const progressDetails = [
  { title: "SPECIFIC PREPARATION", process: "100%" },
  { title: "NUTRITION SKILLS", process: "100%" },
  { title: "FULL BODY TRANSFORMATION", process: "100%" },
];

const Gallery = () => {
  return (
    <>
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="lightgallery container"
        controls={true}
        selector=".lg-show"
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">
          
          {/* FITNESS text block */}
          <div className="flex-shrink-0 d-none d-lg-block position-relative wow fadeInUp">
            <h2 className="bg-data-text style-3 mb-0">
              <span>F</span>
              <span>I</span>
              <span>T</span>
              <span>N</span>
              <span>E</span>
              <span>S</span>
              <span>S</span>
            </h2>
          </div>

          {/* Expertise box */}
          <div className="flex-grow-1 wow fadeInUp" style={{ maxWidth: "400px" }}>
            <div className="content-box h-100">
              <div className="section-head style-1 m-0">
                <h2 className="title">
                  My Fields Of <span>Expertise</span>
                </h2>
                <p className="p-big m-b25">
                  Discover the power of consistent training and mindful movement.
                </p>
                <p className="p-big m-b25">
                  Every session brings you one step closer to your healthiest, strongest self.
                </p>
              </div>
              <Link to="/about-us" className="btn btn-skew btn-primary">
                <span>About Us</span>
              </Link>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="flex-grow-1 wow fadeInUp" style={{ minWidth: "300px" }}>
            <div className="progress-bar-wrapper1">
              {progressDetails.map((item, indexKey) => (
                <div className="progress-bx style-1 mb-3" key={indexKey}>
                  <div className="progress-head d-flex justify-content-between">
                    <h6 className="title mb-0">{item.title}</h6>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: item.process }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </LightGallery>
    </>
  );
};

export default Gallery;
