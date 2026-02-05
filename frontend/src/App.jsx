import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import LetsCook from "./pages/LetsCook";
import SmartIngredients from "./pages/SmartIngredients";
import GymPlanner from "./pages/GymPlanner";
import MyRecipes from "./pages/MyRecipes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// 🛒 NEW
import Store from "./pages/Store";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  const isAdmin = user?.email === "ayush@gmail.com";

  return (
    <BrowserRouter>

      {/* Sidebar only when logged in */}
      {user && <Sidebar />}

      <Routes>

        {/* ========== PUBLIC ROUTES ========== */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Landing />}
        />

        <Route
          path="/login"
          element={
            user ? <Navigate to="/home" /> : <Login setUser={setUser} />
          }
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/home" /> : <Signup />}
        />

        {/* ========== PROTECTED ROUTES ========== */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" />}
        />

        <Route
          path="/lets-cook"
          element={user ? <LetsCook /> : <Navigate to="/" />}
        />

        <Route
          path="/ingredients"
          element={user ? <SmartIngredients /> : <Navigate to="/" />}
        />

        <Route
          path="/gym"
          element={user ? <GymPlanner /> : <Navigate to="/" />}
        />

        <Route
          path="/saved"
          element={user ? <MyRecipes /> : <Navigate to="/" />}
        />

        {/* 🛒 STORE */}
        <Route
          path="/store"
          element={user ? <Store /> : <Navigate to="/" />}
        />

        {/* 🛠 ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            user && isAdmin ? <AdminDashboard /> : <Navigate to="/home" />
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={user ? "/home" : "/"} />}
        />

      </Routes>
    </BrowserRouter>
  );
}
