import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../constants/theme";

// Use environment variable if available, otherwise fallback to default
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";
const API_URL = `${API_BASE}/users`;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [editingField, setEditingField] = useState(null); // 'name' or 'email' or null
  const [tempValue, setTempValue] = useState("");
  const [tempOldPassword, setTempOldPassword] = useState(""); // for password old value
  const [tempNewPassword, setTempNewPassword] = useState(""); // for password new value
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  const inputRef = useRef(null);
  const inputOldRef = useRef(null);
  const inputNewRef = useRef(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // No token, redirect to login
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const res = await fetch(`${API_URL}/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const err = await res.json();
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [navigate]);
  useEffect(() => {
    if (editingField === "password") {
      inputOldRef.current?.focus();
    } else if (editingField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingField]);


  // Start editing any field
  const startEditing = (field) => {
    setUpdateError(null);
    setUpdateSuccess(null);
    setEditingField(field);
    if (field === "password") {
      setTempOldPassword("");
      setTempNewPassword("");
    } else {
      setTempValue(profile.user[field] || "");
    }
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValue("");
    setTempOldPassword("");
    setTempNewPassword("");
    setUpdateError(null);
    setUpdateSuccess(null);
  };

   const saveUpdate = async () => {
    setUpdateError(null);
    setUpdateSuccess(null);

    if (editingField === "password") {
      // Validate password fields
      if (!tempOldPassword.trim() || !tempNewPassword.trim()) {
        setUpdateError("Both old and new passwords are required.");
        return;
      }
      if (tempNewPassword.length < 6) {
        setUpdateError("New password must be at least 6 characters.");
        return;
      }

      setUpdateLoading(true);
      try {
        const token = localStorage.getItem("token");
        console.log("Token before password update:", token);

        if (!token) throw new Error("Not authenticated");

        const res = await fetch(`${API_URL}/me/update-password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: tempOldPassword,
            newPassword: tempNewPassword,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to update password");
        }

        setUpdateSuccess("Password updated successfully.");
        cancelEditing();
      } catch (err) {
        setUpdateError(err.message);
      } finally {
        setUpdateLoading(false);
      }
    } else {
      // Name or email update - existing logic
      if (!tempValue.trim()) {
        setUpdateError("Value cannot be empty");
        return;
      }
      if (!profile) return;

      setUpdateLoading(true);

      try {
        const token = localStorage.getItem("token");
        
        if (!token) throw new Error("Not authenticated");

        const body = { [editingField]: tempValue.trim() };

        const res = await fetch(`${API_URL}/me/update-profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to update profile");
        }

        setProfile((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            [editingField]: tempValue.trim(),
          },
        }));

        setUpdateSuccess("Profile updated successfully.");
        setEditingField(null);
        setTempValue("");
      } catch (err) {
        setUpdateError(err.message);
      } finally {
        setUpdateLoading(false);
      }
    }
  };

  // Handle blur (click outside input)
   const handleBlur = (e) => {
    if (editingField && editingField !== "password") {
      saveUpdate();
    }
  };

  // Handle enter key in input to save immediately
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveUpdate();
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  if (loading)
    return (
      <div className="page-wraper">
        <section
          className="under-construction"
          style={{
            backgroundImage: `url(${IMAGES.BgAppoint})`,
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

  if (error)
    return (
      <div className="page-wraper">
        <section
          className="under-construction"
          style={{
            backgroundImage: `url(${IMAGES.BgAppoint})`,
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
        </section>
      </div>
    );

  const { user, subscription, pack } = profile;

  return (
    <div className="page-wraper">
      <section
        className="under-construction"
        style={{
          backgroundImage: `url(${IMAGES.BgAppoint})`,
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
            {/* Full Name */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: 0,
                  width: "120px",
                  userSelect: "none",
                }}
              >
                Full Name
              </p>
              {editingField === "name" ? (
                <input
                  ref={inputRef}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  disabled={updateLoading}
                  style={{ flex: 1, padding: "8px", fontSize: "1rem" }}
                />
              ) : (
                <>
                  <h2
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "600",
                      color: "#333",
                      margin: 0,
                      flex: 1,
                      textAlign: "left",
                    }}
                  >
                    {user?.name}
                  </h2>
                  <button
                    onClick={() => startEditing("name")}
                    style={{
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      fontSize: "1.25rem",
                      color: "#666",
                    }}
                    aria-label="Edit name"
                    title="Edit name"
                  >
                    ✏️
                  </button>
                </>
              )}
            </div>

            {/* Email */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: 0,
                  width: "120px",
                  userSelect: "none",
                }}
              >
                Email
              </p>
              {editingField === "email" ? (
                <input
                  ref={inputRef}
                  type="email"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  disabled={updateLoading}
                  style={{ flex: 1, padding: "8px", fontSize: "1rem" }}
                />
              ) : (
                <>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      margin: 0,
                      flex: 1,
                      wordBreak: "break-word",
                      textAlign: "left",
                    }}
                  >
                    {user?.email}
                  </p>
                  <button
                    onClick={() => startEditing("email")}
                    style={{
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      fontSize: "1.25rem",
                      color: "#666",
                    }}
                    aria-label="Edit email"
                    title="Edit email"
                  >
                    ✏️
                  </button>
                </>
              )}
            </div>
                     <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "100%",
              }}
            >

              {editingField === "password" ? (
                <>
                  <input
                    ref={inputOldRef}
                    type="password"
                    placeholder="Old password"
                    value={tempOldPassword}
                    onChange={(e) => setTempOldPassword(e.target.value)}
                    disabled={updateLoading}
                    onKeyDown={handleKeyDown}
                    style={{  fontSize: "1rem",
                       backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "50%",
                     }}
                    autoComplete="current-password"
                  />
                  <input
                    ref={inputNewRef}
                    type="password"
                    placeholder="New password"
                    value={tempNewPassword}
                    onChange={(e) => setTempNewPassword(e.target.value)}
                    disabled={updateLoading}
                    onKeyDown={handleKeyDown}
                     style={{  fontSize: "1rem",
                       backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "50%",
                     }}
                    autoComplete="new-password"
                  />
                 <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",  // adds some space between buttons in addition to space-between
    maxWidth: "100%",
    paddingTop: "1rem",
  }}
>
  <button
    onClick={saveUpdate}
    disabled={updateLoading}
    style={{
      fontSize: "1rem",
      backgroundColor: "rgba(155, 140, 3, 0.95)",
      padding: "0.5rem 1rem",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      flex: 1,   // optional, makes buttons equal width
      cursor: updateLoading ? "not-allowed" : "pointer",
      border: "none",
      color: "#fff",
    }}
  >
    Save
  </button>
  <button
    onClick={cancelEditing}
    disabled={updateLoading}
    style={{
      fontSize: "1rem",
      backgroundColor: "rgba(0, 0, 0, 0.95)",
      color: "#fff",
      padding: "0.5rem 1rem",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(169, 6, 6, 0.1)",
      flex: 1,   // optional, makes buttons equal width
      cursor: updateLoading ? "not-allowed" : "pointer",
      border: "none",
    }}
  >
    Cancel
  </button>
</div>

                </>
              ) : (
              <button
  onClick={() => startEditing("password")}
  style={{
    cursor: "pointer",
    background: "none",
    border: "none",
    fontSize: "1.25rem",
    color: "#666",
    padding: 0,
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px", // optional space between text and icon
    width: "100%", // optional: make the button take full width of container
  }}
  aria-label="Edit password"
  title="Edit password"
>
 Update Password ✏️
</button>

              )}
            </div>
            
            {/* Member Since */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #e0e0e0",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "0.5rem",
                }}
              >
                Member Since
              </p>
              <p style={{ fontSize: "1rem", color: "#333", margin: 0 }}>
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : ""}
              </p>
            </div>

            {/* Subscription info */}
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
                  fontSize: "1rem",
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "0.5rem",
                }}
              >
                Subscription
              </p>

              {subscription?.status === "none" && (
                <p style={{ fontSize: "1rem", color: "#333", margin: 0 }}>
                  You don’t have an active subscription.
                </p>
              )}

              {subscription?.status === "expired" && (
                <p style={{ fontSize: "1rem", color: "#333", margin: 0 }}>
                  Your subscription expired on{" "}
                  <strong>
                    {new Date(subscription.end_date).toLocaleDateString()}
                  </strong>
                  .
                </p>
              )}

              {subscription?.status === "active" && (
                <>
                  <p style={{ fontSize: "1rem", color: "#333", margin: 0 }}>
                    Active until{" "}
                    <strong>
                      {new Date(subscription.end_date).toLocaleDateString()}
                    </strong>
                  </p>
                  {pack && (
                    <p style={{ fontSize: "1rem", color: "#555", margin: 0 }}>
                      Pack: <strong>{pack.name}</strong>
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Update status messages */}
            {updateLoading && <p>Updating profile...</p>}
            {updateError && <p style={{ color: "red" }}>{updateError}</p>}
            {updateSuccess && <p style={{ color: "green" }}>{updateSuccess}</p>}
          </div>
        </div>

        {/* Decorative images */}
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
