import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      alert("Login successful");

      // 🔐 ADMIN CHECK
      if (email === "ayush@gmail.com") {
        navigate("/admin");   // admin dashboard
      } else {
        navigate("/home");    // normal user
      }

    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* Branding Section */}
        <div className="brand-header">
           <img 
            src="/newlogo.png" 
            alt="HomeChef Logo" 
            className="login-logo" 
            onClick={() => navigate("/")} 
          />
          <h2 className="brand-name">Home<span>Chef</span></h2>
          <p className="login-subtitle">Welcome back! Please login to your account.</p>
        </div>

        <form className="login-form-grid" onSubmit={handleLogin}>
          <input name="email" type="email" placeholder="Email Address" required />
          <input name="password" type="password" placeholder="Password" required />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="login-footer">
          Don't have an account? <span onClick={() => navigate("/signup")}>Create Account</span>
        </p>
      </div>
    </div>
  );
}