import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-left">
          {/* Logo wrapper to allow large logo without increasing navbar height */}
          <div className="logo-wrapper-nav">
            <img
              src="/newlogo.png"
              alt="HomeChef Logo"
              className="nav-logo"
            />
          </div>

          <span className="brand-name">
            Home<span>Chef</span>
          </span>
        </div>

        <div className="nav-right">
          <button
            className="nav-btn login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="nav-btn signup-btn"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </nav>

      {/* ===== IMAGE SLIDER ===== */}
      <div className="slider">
        <div className="slide-track">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="food" />
          <img src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9" alt="food" />
          <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" alt="food" />
          {/* duplicate for smooth loop */}
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="food" />
          <img src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9" alt="food" />
          <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" alt="food" />
          <img src="https://www.shutterstock.com/shutterstock/videos/3552216811/thumb/1.jpg?ip=x480" alt="food" />
        </div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="hero">
        <div className="logo-wrapper">
          <img
            src="/newlogo.png"
            alt="HomeChef Logo"
            className="brand-logo-big"
          />
        </div>

        <h1 className="hero-title">
          Home<span>Chef</span>
        </h1>

        <p className="hero-subtitle">
          Cook smarter with AI • Eat healthier • Plan better
        </p>

        <div className="hero-highlight">
          Powered by Gemini 2.5 Flash for Recipes, Fitness & Smart Shopping
        </div>

        <div className="hero-actions">
          <button
            className="cta-button"
            onClick={() => navigate("/signup")}
          >
            🚀 Get Started
          </button>
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="features">
        <div className="feature-card">
          <div className="icon">🥘</div>
          <h3>AI Recipe Generator</h3>
          <p>
            Generate delicious recipes instantly using dish names or available ingredients.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">📷</div>
          <h3>Ingredient Detection</h3>
          <p>
            Upload an image and detect vegetables, fruits, and food ingredients automatically.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🏋️</div>
          <h3>Gym Meal Planner</h3>
          <p>
            Personalized weekly gym meal plans based on your goals and diet preferences.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🛒</div>
          <h3>Smart Grocery Search</h3>
          <p>
            Ask AI what to buy and see available products instantly in the store.
          </p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>
          © 2026 <b>HomeChef</b> • Built By Ayush Girulkar & Team
        </p>
        <p className="footer-sub">Smart Food Assistant</p>
      </footer>
    </div>
  );
}
