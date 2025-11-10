import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../constants/theme";

const steps = [
  { title: "Engine Diagnostios", num: "01" },
  { title: "Health & Fitness", num: "02" },
  { title: "Gym & Exercise", num: "03" },
  { title: "Health Motivation", num: "04" },
];
const Home3Services = () => {
  //   const [size, setSize] = useState(false);
  //   const [position, setPosition] = useState({ x: 0, y: 0 });
  //   window.onresize = () => {
  //     if (window.innerWidth > 991) {
  //       setSize(true);
  //     }
  //   };

  //   const disPlayImg = (e) => {
  //     document.querySelectorAll(".img-dz-info").forEach((ell) => {
  //       ell.classList.remove("dz-info");
  //     });
  //     setPosition({ x: e.pageX, y: e.pageY });
  //   };
  return (
    <>
      <div className="row">
        {steps.map((item, ind) => (
          <div
            // onMouseMove={disPlayImg}
            className="col-lg-12 col-sm-6 wow fadeInUp"
            key={ind}
          >
            <div className="process-box style-1 image-tooltip-effect-2 style-2">
              <div className="row align-items-center">
                <div className="col-lg-2">
                  <h3 className="step m-0">
                    {item.num}
                    <span>/ Step</span>
                  </h3>
                </div>
                <div className="col-lg-4">
                  <h2 className="dz-title">
                    <Link to="#">{item.title}</Link>
                  </h2>
                </div>
                <div className="col-lg-6">
                  <p className="descripiton">
                    It is a long established fact that a reader will be
                    distracted by the content of a page when looking at its
                    layout.
                  </p>
                </div>
              </div>
              <div className="dz-info img-dz-info">
                <img
                  src={IMAGES.bloggrid1}
                  alt=""
                  className="title m-b10"
                  style={{
                    position: "absolute",
                    // left: `${position.x}`,
                    // top: `${position.y}`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home3Services;
