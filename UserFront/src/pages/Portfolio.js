import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../constants/theme";
import NewsLetter from "../elements/NewsLetter";
import PageTitle from "../elements/PageTitle";

const fakePackages = [
  {
    id: 1,
    title: "traning 1",
    image: IMAGES.overlayBoxpic5,
    description:
      "Enjoy breathtaking mountain views, guided hikes, and cozy cabins in the Alps.",
  },
  {
    id: 2,
    title: "traning 2",
    image: IMAGES.overlayBoxpic5 || "/images/beach.jpg",
    description:
      "Relax on white sand beaches, enjoy sunset dinners, and swim in turquoise waters.",
  },
  {
    id: 3,
    title: "traning 3",
    image: IMAGES.overlayBoxpic5 || "/images/city.jpg",
    description:
      "Explore nightlife, gourmet restaurants, and iconic landmarks in vibrant cities.",
  },
  {
    id: 4,
    title: "traning 4",
    image: IMAGES.overlayBoxpic5 || "/images/desert.jpg",
    description:
      "Ride across golden dunes, experience camel trekking, and enjoy traditional cuisine.",
  },
  {
    id: 5,
    title: "traning 5",
    image: IMAGES.overlayBoxpic5 || "/images/island.jpg",
    description:
      "Private resort stay, snorkeling adventures, and oceanfront relaxation.",
  },
  {
    id: 6,
    title: "traning 6",
    image: IMAGES.overlayBoxpic5 || "/images/forest.jpg",
    description:
      "Reconnect with nature through guided meditation, yoga, and eco-friendly cabins.",
  },
];

const Packages = () => {
  return (
    <>
      <div className="page-content bg-white">
        {/* === Page Header === */}
        <PageTitle parentTitle="Packages" />

        {/* === Packages Section === */}
        <section className="content-inner">
          <div className="container">
            <div className="row">
              {fakePackages.map((pkg) => (
                <div
                  className="col-xl-4 col-lg-6 col-md-6 m-b30 wow fadeInUp"
                  data-wow-delay="0.2s"
                  key={pkg.id}
                >
                  <div className="card shadow-sm border-0 rounded-3 overflow-hidden h-100">
                    <div className="card-img-top">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="img-fluid w-100"
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="mb-2 text-dark fw-bold">{pkg.title}</h4>
                        <p className="text-muted small mb-2">{pkg.duration}</p>
                        <p className="text-secondary">{pkg.description}</p>
                      </div>
                      <div className="mt-3">
                        <Link
                          to={`/packages/${pkg.id}`}
                          className="btn btn-dark btn-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === Newsletter Section === */}
        <section className="call-action style-1 footer-action">
          <div className="container">
            <NewsLetter />
          </div>
        </section>
      </div>
    </>
  );
};

export default Packages;
