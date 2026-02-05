import { useEffect, useState } from "react";
import api from "../services/api";
import { parseRecipe } from "../utils/recipeParser";
import { parseGymPlan } from "../utils/gymPlanParser";
import { speak } from "../utils/tts";
import { downloadPDF } from "../utils/pdf";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);

  // DELETE
  const deleteRecipe = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await api.delete(`/save/recipe/${id}`);
      setRecipes(prev => prev.filter(r => r.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  // LOAD SAVED DATA
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return;

    api.get(`/save/recipes/${user.id}`)
      .then(res => setRecipes(res.data))
      .catch(() => alert("Failed to load saved items"));
  }, []);

  return (
    <div className="page">
      <h2>⭐ My Saved Recipes & Plans</h2>

      {recipes.length === 0 && (
        <p style={{ textAlign: "center", color: "#5f6368" }}>
          Nothing saved yet 🍽️
        </p>
      )}

      {recipes.map((r) => {
        // 🔥 DETECT TYPE
        const isGymPlan =
          r.title?.toLowerCase().includes("gym meal plan");

        const parsedRecipe = !isGymPlan
          ? parseRecipe(r.content)
          : null;

        const parsedGym = isGymPlan
          ? parseGymPlan(r.content)
          : [];

        return (
          <div key={r.id} className="recipe-ui">

            {/* ===== TITLE ===== */}
            <h2 className="recipe-title">
              {isGymPlan ? "🥗" : "🍛"} {r.title}
            </h2>

            {/* ===== GYM MEAL PLAN VIEW ===== */}
            {isGymPlan && parsedGym.length > 0 && (
              <div className="meal-week">
                {parsedGym.map((day, i) => (
                  <div key={i} className="day-card">
                    <h3 className="day-title">📅 {day.day}</h3>

                    <table className="meal-table">
                      <thead>
                        <tr>
                          <th>Meal</th>
                          <th>What to Eat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.meals.map((m, idx) => (
                          <tr key={idx}>
                            <td className={`meal-badge ${m.time.toLowerCase()}`}>
                              {m.time}
                            </td>
                            <td>{m.food}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            {/* ===== NORMAL RECIPE VIEW ===== */}
            {!isGymPlan && (
              <>
                {parsedRecipe.ingredients.length > 0 && (
                  <div className="recipe-section ingredients">
                    <h3>🧺 Ingredients</h3>
                    <ul>
                      {parsedRecipe.ingredients.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {parsedRecipe.steps.length > 0 && (
                  <div className="recipe-section steps">
                    <h3>👩‍🍳 Steps</h3>
                    {parsedRecipe.steps.map((step, i) => (
                      <div key={i} className="step-card">
                        <span>Step {i + 1}</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                )}

                {parsedRecipe.tips.length > 0 && (
                  <div className="recipe-section tips">
                    <h3>💡 Cooking Tips</h3>
                    <ul>
                      {parsedRecipe.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* ===== ACTIONS ===== */}
            <div className="actions">
              <button onClick={() => speak(r.content, "en-IN")}>
                🔊 Read
              </button>

              <button onClick={() => downloadPDF(r.title, r.content)}>
                📄 Download PDF
              </button>

              <button
                style={{ background: "#ea4335" }}
                onClick={() => deleteRecipe(r.id)}
              >
                🗑️ Delete
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}
