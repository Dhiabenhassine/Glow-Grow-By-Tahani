import React from "react";
import { Link } from "react-router-dom";

const cards = [
  { icon: "flaticon-fitness", title: "Our Classes" },
  { icon: "flaticon-user", title: "Our Trainers" },
  { icon: "flaticon-medal", title: "Memberships" },
  { icon: "flaticon-calendar", title: "Our Timeline" },
];
const HomebannerCard = () => {
  return (
    <>
      <div className="row align-items-center justify-content-center">
        {cards.map((item, ind) => (
          <div
            className="col-xl-3 col-sm-6 mb-xl-0 mb-4 wow fadeInUp"
            key={ind}
          >
            <div className="icon-bx-wraper style-4 bg-white">
              <div className="icon-bx m-b20">
                <div className="icon-cell text-primary">
                  <i className={item.icon}></i>
                </div>
              </div>
              <div className="icon-content">
                <h4 className="dz-title m-b10">
                  <Link to="/pricing">{item.title}</Link>
                </h4>
                <p className="m-b15">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <Link to="/pricing" className="read-more">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomebannerCard;
