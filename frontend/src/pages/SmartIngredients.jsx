import { useState } from "react";
import api from "../services/api";
import { speak } from "../utils/tts";
import { downloadPDF } from "../utils/pdf";
import { parseRecipe } from "../utils/recipeParser";
import "./SmartIngredients.css";

export default function SmartIngredients() {

  const [ingredients, setIngredients] = useState("");
  const [language, setLanguage] = useState("english");
  const [recipeList, setRecipeList] = useState([]);
  const [fullRecipe, setFullRecipe] = useState("");
  const [selectedRecipeName, setSelectedRecipeName] = useState("");
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

  // IMAGE UPLOAD / CAMERA
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        setLoading(true);

        const res = await api.post("/ingredients/detect-image", {
          image: base64
        });

        const labels = Array.isArray(res.data)
          ? res.data
              .filter(item => item.score > 0.25)
              .map(item => item.label)
              .join(", ")
          : "";

        setIngredients(cleanGeminiText(labels || "No ingredients detected"));

      } catch (err) {
        console.error(err);
        alert("Failed to detect ingredients from image");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  // TEXT-BASED INGREDIENT DETECTION
  const detectFromText = async () => {
    if (!ingredients.trim()) {
      alert("Please enter ingredients");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/ingredients/detect", {
        text: ingredients
      });
      setIngredients(cleanGeminiText(res.data));
    } catch {
      alert("Failed to detect ingredients");
    } finally {
      setLoading(false);
    }
  };

  // GET RECIPE LIST
  const getRecipes = async () => {
    if (!ingredients.trim()) {
      alert("No ingredients available");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/ingredients/recipes", {
        ingredients,
        language
      });

      const jsonText = res.data.match(/\{[\s\S]*\}/);
      if (jsonText) {
        const parsed = JSON.parse(jsonText[0]);
        setRecipeList(parsed.recipes || []);
      } else {
        alert("AI response format error");
      }
    } catch {
      alert("Failed to generate recipes");
    } finally {
      setLoading(false);
    }
  };

  // OPEN FULL RECIPE
  const openRecipe = async (name) => {
    try {
      setLoading(true);
      setSelectedRecipeName(name);

      const res = await api.post("/recipe/from-name", {
        recipe: name,
        language
      });

      setFullRecipe(cleanGeminiText(res.data));
    } catch {
      alert("Failed to load recipe");
    } finally {
      setLoading(false);
    }
  };

  // SAVE RECIPE
  const saveRecipe = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await api.post("/save/recipe", {
        userId: user.id,
        title: parsed.title || selectedRecipeName,
        content: fullRecipe
      });

      alert("Recipe saved successfully");
    } catch {
      alert("Failed to save recipe");
    }
  };

  // LANGUAGE MAP FOR TTS
  const mapLang = () => {
    if (language === "hindi") return "hi-IN";
    if (language === "marathi") return "mr-IN";
    return "en-IN";
  };

  // 🔥 PARSE CLEAN TEXT ONLY
  const parsed = parseRecipe(fullRecipe);

  return (
    <div className="page">
      <h2>📸 Smart Ingredients</h2>

      {/* IMAGE INPUT */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
      />

      <p style={{ textAlign: "center", color: "#5f6368" }}>OR</p>

      {/* INGREDIENT INPUT */}
      <textarea
        placeholder="Edit or type ingredients (potato, onion, tomato)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button onClick={detectFromText}>
        Detect Ingredients
      </button>

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="marathi">Marathi</option>
      </select>

      <button onClick={getRecipes}>
        Find Recipes
      </button>

      {/* RECIPE SUGGESTIONS */}
      {recipeList.map((r, i) => (
        <div
          key={i}
          className="recipe-mini-card"
          onClick={() => openRecipe(r.name)}
        >
          <h4>{r.name}</h4>
          <p>{r.desc}</p>
        </div>
      ))}

      {/* FULL RECIPE */}
      {fullRecipe && (
        <div className="recipe-ui">

          <h2 className="recipe-title">
            🍽️ {parsed.title || selectedRecipeName}
          </h2>

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

          <div className="actions">
            <button onClick={() => speak(fullRecipe, mapLang())}>
              🔊 Read
            </button>

            <button onClick={saveRecipe}>
              ⭐ Save
            </button>

            <button onClick={() =>
              downloadPDF(parsed.title || "Recipe", fullRecipe)
            }>
              📄 Download PDF
            </button>
          </div>

        </div>
      )}

      {loading && <p style={{ textAlign: "center" }}>Processing...</p>}
    </div>
  );
}
