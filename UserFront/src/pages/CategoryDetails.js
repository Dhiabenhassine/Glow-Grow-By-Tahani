import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../elements/PageTitle";
import NewsLetter from "../elements/NewsLetter";
import "../assets/css/PackagesDetails.css"; // <-- create this CSS file for the card
import { Link } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";
const API_URL = `${API_BASE}/courses/categories`;

const PackagesDetails = () => {
  const { id } = useParams();
  const [packs, setPacks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPacks() {
      try {
        const res = await fetch(`${API_URL}/${id}/packs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch pack details");

        const data = await res.json();
        setPacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPacks();
  }, [id]);

  return (
    <div className="page-wraper">
      <div className="page-content bg-white">
        <PageTitle activePage="Package Details" parentTitle="Packages" />

        
        <div className="container py-5">
          {error && <p className="text-danger">{error}</p>}
          {loading && !error && <p>Loading pack details...</p>}

          {!loading && !error && packs.length > 0 ? (
           
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {packs.map((pack) => (
                  <Link to={`/packages-details/${pack.id}`} >
                <div key={pack.id} className="card position-relative">
                  <div className="bg"></div>
                  <div className="blob"></div>
                  <div
                    className="card-content"
                    style={{
                      position: "relative",
                      zIndex: 3,
                      textAlign: "center",
                      padding: "20px",
                      color: "#000000ff",
                    }}
                  >
                    <h4 className="fw-bold mb-2">{pack.name}</h4>
                    <p className="text-muted small mb-2">{pack.description}</p>
                    <p className="fw-semibold mb-3">
                      Category: {pack.category_name}
                    </p>

                    {pack.plans && pack.plans.length > 0 && (
                      <div className="plans">
                        {pack.plans.map((plan) => (
                          <div key={plan._id} className="plan-item mb-2">
                            <strong>{plan.label}</strong> –{" "}
                            {plan.duration_days} days –{" "}
                            <span className="text-success">
                              ${(plan.price_cents / 100).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              ))}
            </div>
          ) : (
            !loading && !error && <p>No packs found for this category.</p>
          )}
        </div>

        <section className="call-action style-1 footer-action">
          <div className="container">
            <NewsLetter />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PackagesDetails;
