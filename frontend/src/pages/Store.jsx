import { useEffect, useState } from "react";
import api from "../services/api";
import "./Store.css";


export default function Store() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load all products
  useEffect(() => {
    api.get("/products/all")
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load products");
      });
  }, []);

  // 🔹 Gemini smart search
  const smartSearch = async () => {
    if (!query.trim()) {
      setFilteredProducts(products);
      setResult("");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/products/search", {
        query: query.trim()
      });

      const aiResult = res.data;
      setResult(aiResult);

      if (aiResult === "NOT_AVAILABLE") {
        setFilteredProducts([]);
        return;
      }

      const keywords = aiResult
        .toLowerCase()
        .split(",")
        .map(k => k.trim());

      const matched = products.filter(p =>
        keywords.some(k => p.name.toLowerCase().includes(k))
      );

      setFilteredProducts(matched);

    } catch (err) {
      console.error(err);
      alert("Smart search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>🛍️ Grocery Store</h2>

      {/* 🔍 Gemini Search */}
      <div className="search-box">
        <input
          placeholder="Eg: for making strawberry shake"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={smartSearch} disabled={loading}>
          {loading ? "Searching..." : "🔍 Smart Search"}
        </button>
      </div>

      {/* 🧠 Gemini Result */}
      {result && (
        <div className="gemini-result">
          🤖 <b>AI Suggestion:</b> {result}
        </div>
      )}

      {/* 🛒 Product Grid */}
      {filteredProducts.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#666" }}>
          No matching products found.
        </p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(p => (
            <div key={p.id} className="product-card">

              <div className="image-wrap">
                <img src={p.image} alt={p.name} />
              </div>

              <div className="product-info">
                <h4>{p.name}</h4>
                <p className="desc">{p.description}</p>

                <div className="price-buy">
                  <span className="price">₹{p.price}</span>
                  <button onClick={() => alert("✅ Order placed (demo)")}>
                    Buy
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
