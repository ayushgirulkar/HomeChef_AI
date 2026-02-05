import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const mobile = e.target.mobile.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const avatar = e.target.avatar.value;

    /* ===== VALIDATIONS ===== */

    // Name: only letters & spaces
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(name)) {
      alert("Name should contain only letters");
      return;
    }

    // Mobile: only digits & exactly 10 digits
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password length check
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const user = { name, mobile, email, password, avatar };

    try {
      await api.post("/auth/signup", user);
      alert("Signup successful 🎉");
      navigate("/login");
    } catch {
      alert("User already exists or signup failed");
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-card">
        {/* Branding Section */}
        <div className="brand-header">
          <img
            src="/newlogo.png"
            alt="HomeChef Logo"
            className="signup-logo"
            onClick={() => navigate("/")}
          />
          <h2 className="brand-name">
            Home<span>Chef</span>
          </h2>
          <p className="signup-subtitle">Join our culinary community!</p>
        </div>

        <form className="signup-form-grid" onSubmit={handleSubmit}>
          <div className="input-row">
            <input name="name" type="text" placeholder="Full Name" required />
            <input
              name="mobile"
              type="text"
              placeholder="Mobile Number"
              maxLength="10"
              required
            />
          </div>

          <input name="email" type="email" placeholder="Email Address" required />
          <input name="password" type="password" placeholder="Password" required />

          <div className="select-box">
            <label>Choose Avatar</label>
            <select name="avatar" defaultValue="male">
              <option value="male">👨 Male Chef</option>
              <option value="female">👩 Female Chef</option>
            </select>
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>

        <p className="signup-footer">
          Already a chef? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
