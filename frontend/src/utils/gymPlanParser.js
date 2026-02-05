const MEAL_ORDER = ["Morning", "Breakfast", "Lunch", "Evening", "Dinner"];

export function parseGymPlan(text) {
  if (!text) return [];

  const days = [];
  const blocks = text.split(/Day:\s*/).filter(Boolean);

  for (const block of blocks) {
    const lines = block
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    const dayName = lines[0];
    const meals = [];

    for (const meal of MEAL_ORDER) {
      const line = lines.find(l =>
        l.toLowerCase().startsWith(meal.toLowerCase() + ":")
      );

      meals.push({
        time: meal,
        food: line
          ? line.substring(meal.length + 1).trim()
          : "—"
      });
    }

    days.push({ day: dayName, meals });
  }

  return days;
}
