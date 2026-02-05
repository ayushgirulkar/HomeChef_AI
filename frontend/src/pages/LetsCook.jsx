import { useState } from "react";
import api from "../services/api";
import { speak } from "../utils/tts";
import { downloadPDF } from "../utils/pdf";
import { parseRecipe } from "../utils/recipeParser";
import "./LetsCook.css";

export default function LetsCook() {

  const [dish, setDish] = useState("");
  const [language, setLanguage] = useState("english");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 CLEAN GEMINI MARKDOWN
  const cleanGeminiText = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/###/g, "")
      .replace(/##/g, "")
      .replace(/#/g, "")
      .trim();
  };

  // Generate recipe from Gemini
  const generateRecipe = async () => {
    if (!dish.trim()) {
      alert("Please enter dish name");
      return;
    }

    try {
      setLoading(true);
      setRecipe("");

      const res = await api.post("/recipe/lets-cook", {
        dish,
        language
      });

      // 🔥 CLEAN OUTPUT HERE
      setRecipe(cleanGeminiText(res.data));

    } catch {
      alert("Error generating recipe");
    } finally {
      setLoading(false);
    }
  };

  // Save recipe to database
  const saveRecipe = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await api.post("/save/recipe", {
        userId: user.id,
        title: parsed.title || dish,
        content: recipe
      });

      alert("Recipe saved successfully");
    } catch {
      alert("Failed to save recipe");
    }
  };

  // Language mapping for text-to-speech
  const mapLang = () => {
    if (language === "hindi") return "hi-IN";
    if (language === "marathi") return "mr-IN";
    return "en-IN";
  };

  // 🔥 PARSE CLEAN TEXT ONLY
  const parsed = parseRecipe(recipe);

  return (
    <div className="page">
      <h2>🍳 Let’s Cook</h2>

      <input
        placeholder="Enter dish name (e.g. Rajma Chawal)"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
      />

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="marathi">Marathi</option>
      </select>

      <button onClick={generateRecipe}>
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {/* ===== BEAUTIFUL RECIPE UI ===== */}
      {recipe && (
        <div className="recipe-ui">

          <h2 className="recipe-title">🍛 {parsed.title || dish}</h2>

          {/* INGREDIENTS */}
          {parsed.ingredients.length > 0 && (
            <div className="recipe-section ingredients">
              <h3>🧺 Ingredients</h3>
              <ul>
                {parsed.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* STEPS */}
          {parsed.steps.length > 0 && (
            <div className="recipe-section steps">
              <h3>👩‍🍳 Steps</h3>
              {parsed.steps.map((step, i) => (
                <div key={i} className="step-card">
                  <span>Step {i + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          )}

          {/* TIPS */}
          {parsed.tips.length > 0 && (
            <div className="recipe-section tips">
              <h3>💡 Cooking Tips</h3>
              <ul>
                {parsed.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ACTIONS */}
          <div className="actions">
            <button onClick={() => speak(recipe, mapLang())}>
              🔊 Read Recipe
            </button>

            <button onClick={saveRecipe}>
              ⭐ Save
            </button>

            <button onClick={() => downloadPDF(parsed.title || "Recipe", recipe)}>
              📄 Download PDF
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
