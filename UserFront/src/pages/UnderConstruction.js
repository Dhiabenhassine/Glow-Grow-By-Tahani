import React, { useEffect, useState } from "react";
import { IMAGES } from "../constants/theme";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4000/api/users";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        if (!token) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetch response status:", res.status);

        if (!res.ok) {
          const err = await res.json();
          console.error("Fetch error response:", err);
          throw new Error(err.error || "Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/home-2");
    }
  };

  if (loading) {
    return (
      <div className="page-wraper">
        <section
          className="under-construction"
          style={{
            backgroundImage: "url(" + IMAGES.BgAppoint + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="inner-construction">
            <p>Loading profile...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wraper">
        <section
          className="under-construction"
          style={{
            backgroundImage: "url(" + IMAGES.BgAppoint + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: "#000",
            padding: "3rem",
            textAlign: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="dz-head">Error</h1>
          <p>{error}</p>

          {/* Decorative images with pointerEvents disabled */}
          <img
            className="shape1 rotate-360"
            src={IMAGES.circlesvg1 || "/placeholder.svg"}
            alt=""
            style={{ pointerEvents: "none" }}
          />
          <img
            className="shape2 rotate-360"
            src={IMAGES.circlesvg1 || "/placeholder.svg"}
            alt=""
            style={{ pointerEvents: "none" }}
          />
          <img
            className="shape3 dzmove1"
            src={IMAGES.circlesvg2 || "/placeholder.svg"}
            alt=""
            style={{ pointerEvents: "none" }}
          />
          <img
            className="shape4 dzmove2"
            src={IMAGES.circlesvg2 || "/placeholder.svg"}
            alt=""
            style={{ pointerEvents: "none" }}
          />
          <img
            className="shape5 dzmove2"
            src={IMAGES.circlesvg2 || "/placeholder.svg"}
            alt=""
            style={{ pointerEvents: "none" }}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="page-wraper">
      <section
        className="under-construction"
        style={{
          backgroundImage: "url(" + IMAGES.BgAppoint + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "#000",
          padding: "3rem",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            marginBottom: "2rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "5px",
            border: "1px solid #333",
            backgroundColor: "#f0f0f0",
          }}
        >
          ← Return
        </button>

        <div className="inner-construction">
          <h1 className="dz-head" style={{ marginBottom: "2rem" }}>
            Profile
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #e0e0e0",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "0.5rem",
                }}
              >
                Full Name
              </p>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "600",
                  color: "#333",
                  margin: "0",
                }}
              >
                {profile.name}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "2px solid #e0e0e0",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#333",
                    margin: "0",
                    wordBreak: "break-word",
                  }}
                >
                  {profile.email}
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #e0e0e0",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "0.5rem",
                }}
              >
                Member Since
              </p>
              <p style={{ fontSize: "1rem", color: "#333", margin: "0" }}>
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative images with pointerEvents disabled */}
        <img
          className="shape1 rotate-360"
          src={IMAGES.circlesvg1 || "/placeholder.svg"}
          alt=""
          style={{ pointerEvents: "none" }}
        />
        <img
          className="shape2 rotate-360"
          src={IMAGES.circlesvg1 || "/placeholder.svg"}
          alt=""
          style={{ pointerEvents: "none" }}
        />
        <img
          className="shape3 dzmove1"
          src={IMAGES.circlesvg2 || "/placeholder.svg"}
          alt=""
          style={{ pointerEvents: "none" }}
        />
        <img
          className="shape4 dzmove2"
          src={IMAGES.circlesvg2 || "/placeholder.svg"}
          alt=""
          style={{ pointerEvents: "none" }}
        />
        <img
          className="shape5 dzmove2"
          src={IMAGES.circlesvg2 || "/placeholder.svg"}
          alt=""
          style={{ pointerEvents: "none" }}
        />
        <img
          className="girl-img"
          src={IMAGES.footergril1 || "/placeholder.svg"}
          alt=""
          style={{ pointerEvents: "none" }}
        />
      </section>
    </div>
  );
};

export default Profile;
