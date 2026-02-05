import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // 🔐 ADMIN PROTECTION
  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      alert("Access denied");
      navigate("/home");
    }
  }, [user, navigate]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const addProduct = async () => {
    if (!name || !price) {
      alert("Name & price required");
      return;
    }

    try {
      await api.post("/products/add", {
        name,
        description: desc,
        price: Number(price),
        image
      });

      alert("✅ Product added successfully");

      setName("");
      setPrice("");
      setDesc("");
      setImage("");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="page">
      <h2>🛒 Admin Dashboard</h2>

      <input
        placeholder="Product name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <button onClick={addProduct}>➕ Add Product</button>
    </div>
  );
}
