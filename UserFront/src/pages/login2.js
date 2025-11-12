import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/App.css";

const API_URL = "http://localhost:4000/api/auth";

const App = () => {
  const [name, setName] = useState("");       // For signup name input
  const [email, setEmail] = useState("");     // For email input
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isSignup) {
        // === REGISTER ===
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");

        setMessage(`✅ Welcome, ${data.name}! Redirecting to Sign In...`);

        setTimeout(() => {
          setIsSignup(false);
          setName("");
          setEmail("");
          setPassword("");
          navigate("/signin");
        }, 1500);
      } else {
        // === LOGIN ===
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");

        setMessage(`✅ Logged in as ${data.name}`);
        console.log("User data:", data);

        // Save login info to localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data)); // Assuming data contains user info directly
        localStorage.setItem("token", data.token);

        setTimeout(() => {
          navigate("/home-2");
        }, 1000);
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <>
      {/* === Animated Background === */}
      <section className="background">
        {Array(130)
          .fill("")
          .map((_, index) => (
            <span key={index}></span>
          ))}
      </section>

      {/* === Centered Signin Area === */}
      <div className="signin-wrapper">
        <div className="signin">
          <div className="content">
            <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
            <form className="form" onSubmit={handleSubmit}>
              {isSignup && (
                <div className="inputBox">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                  <i>Name</i>
                </div>
              )}

              <div className="inputBox">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <i>Email</i>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <i>Password</i>
              </div>

              <div className="links">
                <button
                  type="button"
                  onClick={() => alert("TODO: Forgot password flow")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: 0,
                  }}
                >
                  Forgot Password?
                </button>

                {isSignup ? (
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignup(false);
                      setMessage("");
                    }}
                  >
                    Already have an account? Sign In
                  </Link>
                ) : (
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignup(true);
                      setMessage("");
                    }}
                  >
                    Don’t have an account? Sign Up
                  </Link>
                )}
              </div>

              <div className="inputBox">
                <input type="submit" value={isSignup ? "Sign Up" : "Login"} />
              </div>
            </form>

            {message && (
              <p style={{ color: "#fff", marginTop: "10px" }}>{message}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
