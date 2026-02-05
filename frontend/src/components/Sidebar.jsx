import { Link } from "react-router-dom";

export default function Sidebar() {

  // Safely get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/home";
  };

  const isAdmin = user?.email === "ayush@gmail.com";

  return (
    <div className="sidebar">

      {/* PROFILE SECTION */}
      <div className="profile">
        <div className="avatar">
          {user.avatar === "female" ? "👩" : "👨"}
        </div>
        <p>{user.name || "User"}</p>
        {isAdmin && <span className="admin-badge">ADMIN</span>}
      </div>

      {/* NAVIGATION */}
      <nav>
        <Link to="/">🏠 Home</Link>
        <Link to="/lets-cook">🍳 Let’s Cook</Link>
        <Link to="/ingredients">🥕 Smart Ingredients</Link>
        <Link to="/gym">🏋️ Gym Planner</Link>
        <Link to="/saved">⭐ My Recipes</Link>

        {/* 🛒 STORE FEATURE */}
        <Link to="/store">🛒 Buy Products</Link>

        {/* 🔐 ADMIN ONLY */}
        {isAdmin && (
          <Link to="/admin">🛠 Admin Dashboard</Link>
        )}
      </nav>

      {/* LOGOUT */}
      <button className="logout" onClick={logout}>
        🚪 Logout
      </button>

    </div>
  );
}
