import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components
import AdminOrders from "./components/AdminOrders";
import Home from "./components/Home";
import ServiceDetail from "./components/ServiceDetail";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import UserLoginPage from "./components/UserLoginPage";
import UserSignupPage from "./components/UserSignupPage";
import AuthPage from './components/AuthPage';


import "./App.css";

// ✅ Central API URL (works for local + production)
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

// ----------------------------------
// OrderForm Component
// ----------------------------------
function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMessage("");
    setSubmitError("");

    const data = new FormData();
    for (const key in formData) {
      if (key === "file" && formData[key]) data.append("file", formData[key]);
      else if (key !== "file") data.append(key, formData[key]);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        setSuccessMessage(result.message || "✅ Order submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          description: "",
          file: null,
        });
      } else {
        setSubmitError(result.message || "❌ Failed to submit order.");
      }
    } catch (err) {
      setSubmitError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide success/error messages after 5s
  useEffect(() => {
    if (successMessage || submitError) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setSubmitError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, submitError]);

  return (
    <div className="form-container">
      <h1 className="form-title">InkNest - Custom Printing Orders</h1>
      <form onSubmit={handleSubmit} className="order-form">
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="form-input"
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <input
          name="serviceType"
          placeholder="Service Type (e.g., Photo Print)"
          value={formData.serviceType}
          onChange={handleChange}
          required
          className="form-input"
        />

        <textarea
          name="description"
          placeholder="Describe your requirements"
          value={formData.description}
          onChange={handleChange}
          required
          className="form-textarea"
        />

        <input
          name="file"
          type="file"
          onChange={handleChange}
          className="form-file"
        />
        {formData.file && <p className="file-preview">📂 {formData.file.name}</p>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Submitting..." : "Submit Order"}
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {submitError && <p className="error-message">{submitError}</p>}
      </form>
    </div>
  );
}

// ----------------------------------
// Main App Component
// ----------------------------------
function App() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken") || "");

  useEffect(() => {
    if (adminToken) localStorage.setItem("adminToken", adminToken);
    else localStorage.removeItem("adminToken");
  }, [adminToken]);

  useEffect(() => {
    if (userToken) localStorage.setItem("userToken", userToken);
    else localStorage.removeItem("userToken");
  }, [userToken]);

  const handleLogout = () => {
    setAdminToken("");
    setUserToken("");
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/order" className="nav-link">Order Form</Link>
        {adminToken ? (
          <>
            <Link to="/admin/orders" className="nav-link">Admin Orders</Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </>
        ) : userToken ? (
          <>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/admin/login" className="nav-link">Admin Login</Link>
            <Link to="/user/login" className="nav-link">User Login</Link>
            <Link to="/user/signup" className="nav-link">User Signup</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />

        {/* User Routes */}
        <Route path="/user/signup" element={<UserSignupPage />} />
        <Route path="/user/login" element={<UserLoginPage setToken={setUserToken} />} />

        {/* Admin Routes */}
        <Route
          path="/admin/orders"
          element={
            adminToken ? (
              <AdminOrders token={adminToken} />
            ) : (
              <LoginPage setToken={setAdminToken} />
            )
          }
        />
        <Route path="/admin/login" element={<LoginPage setToken={setAdminToken} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
