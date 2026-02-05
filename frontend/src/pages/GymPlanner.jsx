import { useState } from "react";
import api from "../services/api";
import { speak } from "../utils/tts";
import { downloadPDF } from "../utils/pdf";
import { parseGymPlan } from "../utils/gymPlanParser";
import "./GymPlanner.css";

export default function GymPlanner() {
  const [goal, setGoal] = useState("gain muscle");
  const [weight, setWeight] = useState("");
  const [diet, setDiet] = useState("veg");
  const [meals, setMeals] = useState("5");
  const [language, setLanguage] = useState("english");
  const [plan, setPlan] = useState("");
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

 const generatePlan = async () => {
  if (!weight) {
    alert("Please enter your weight");
    return;
  }

  try {
    setLoading(true);

    const res = await api.post("/meal-planner/generate", {
      goal,
      weight,
      diet,
      meals,
      language
    });

    // ✅ EXACT TEXT THAT WILL BE SAVED & READ
    const finalPlan = cleanGeminiText(res.data || "");
    setPlan(finalPlan);

  } catch {
    alert("Failed to generate meal plan");
  } finally {
    setLoading(false);
  }
};


  const saveMealPlan = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || !user.id) {
    alert("Login required");
    return;
  }

  if (!plan || plan.trim().length < 20) {
    alert("Meal plan is empty");
    return;
  }

  try {
    await api.post("/save/recipe", {
      userId: user.id,
      title: `Gym Meal Plan (${goal})`,
      content: plan   // 🔥 SAME TEXT AS DISPLAYED
    });

    alert("Meal plan saved");

  } catch {
    alert("Failed to save meal plan");
  }
};



  const mapLang = () => {
    if (language === "hindi") return "hi-IN";
    if (language === "marathi") return "mr-IN";
    return "en-IN";
  };

  // 🔥 PARSE CLEAN TEXT ONLY
  const parsedDays = parseGymPlan(plan);

  return (
    <div className="page">
      <h2>🏋️ Gym Freak Meal Planner</h2>

      <div className="controls">
        <select value={goal} onChange={e => setGoal(e.target.value)}>
          <option value="gain muscle">Gain Muscle</option>
          <option value="lose weight">Lose Weight</option>
          <option value="maintain fitness">Maintain Fitness</option>
        </select>

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />

        <select value={diet} onChange={e => setDiet(e.target.value)}>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>

        <select value={meals} onChange={e => setMeals(e.target.value)}>
          <option value="3">3 Meals / Day</option>
          <option value="5">5 Meals / Day</option>
        </select>

        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="marathi">Marathi</option>
        </select>

        <button onClick={generatePlan} disabled={loading}>
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </div>

      {parsedDays.length > 0 && (
        <div className="meal-week">
          {parsedDays.map((day, i) => (
            <div key={`${day.day}-${i}`} className="day-card">
              <h3 className="day-title">📅 {day.day}</h3>

              <table className="meal-table">
                <thead>
                  <tr>
                    <th>Meal</th>
                    <th>What to Eat</th>
                  </tr>
                </thead>
                <tbody>
                  {day.meals
                    .filter(m => m.food && m.food.trim().length > 2)
                    .map((m, idx) => (
                      <tr key={`${m.time}-${idx}`}>
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

          <div className="actions">
            <button onClick={() => speak(plan, mapLang())}>
              🔊 Read
            </button>
            <button onClick={saveMealPlan}>
              ⭐ Save
            </button>
            <button onClick={() => downloadPDF("Gym Meal Plan", plan)}>
              📄 PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
