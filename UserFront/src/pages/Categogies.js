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
    <div className="page-content" style={{ backgroundColor: "#fdffa2ff" }}>
      {/* === Page Header === */}
      <PageTitle parentTitle="Packages" />

      {/* === Packages Section === */}
      <section className="content-inner">
        <div className="container">
          {loading && <p>Loading packages...</p>}
          {error && <p className="text-danger">{error}</p>}

          <div className="packages-grid">
  {!loading && !error && packages.length > 0 ? (
    packages.map((pkg) => (
      <div className="package-card" key={pkg.id}>
        <img
          src={
            pkg.image_url ||
            IMAGES.placeholder ||
            "/images/default-package.jpg"
          }
          alt={pkg.name}
        />
        <div className="package-card-body">
          <div>
            <h4>{pkg.name}</h4>
            <p>{pkg.slug}</p>
          </div>
          <Link
            to={`/packages-details/${pkg.id}`}
            className="btn btn-dark"
          >
            View Details
          </Link>
        </div>
      </div>
    ))
  ) : (
    !loading && !error && <p>No packages available at the moment.</p>
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
  );
};

export default Packages;
