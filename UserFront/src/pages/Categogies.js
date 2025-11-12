import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../constants/theme";
import NewsLetter from "../elements/NewsLetter";
import PageTitle from "../elements/PageTitle";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";
const API_URL = `${API_BASE}`;

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/courses/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch packages");

        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  return (
    <>
      <div className="page-content bg-white">
        {/* === Page Header === */}
        <PageTitle parentTitle="Packages" />

        {/* === Packages Section === */}
        <section className="content-inner">
          <div className="container">
            {loading && <p>Loading packages...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
              {!loading && !error && packages.length > 0 ? (
                packages.map((pkg) => (
                  <div
                    className="col-xl-4 col-lg-6 col-md-6 m-b30 wow fadeInUp"
                    data-wow-delay="0.2s"
                    key={pkg.id}
                  >
                    <div className="card shadow-sm border-0 rounded-3 overflow-hidden h-100">
                      <div className="card-img-top">
                        <img
                          src={
                            pkg.image_url
                              ? pkg.image_url
                              : IMAGES.placeholder || "/images/default-package.jpg"
                          }
                          alt={pkg.name}
                          className="img-fluid w-100"
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h4 className="mb-2 text-dark fw-bold">{pkg.name}</h4>
                          <p className="text-secondary">{pkg.slug}</p>
                        </div>
                        <div className="mt-3">
                         <Link to={`/packages-details/${pkg.id}`} className="btn btn-dark btn-sm">
                          View Details
                        </Link>

                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                !loading &&
                !error && <p>No packages available at the moment.</p>
              )}
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
