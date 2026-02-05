export function parseMealPlan(text) {
  if (!text) return [];

  const days = [];
  let currentDay = null;

  const lines = text.split("\n");

  lines.forEach(line => {
    const l = line.trim();

    // Match **Day: Monday**
    const dayMatch = l.match(/\*\*Day:\s*(.+?)\*\*/i);
    if (dayMatch) {
      currentDay = {
        day: dayMatch[1],
        meals: []
      };
      days.push(currentDay);
      return;
    }

    // Match MealType: Description
    const mealMatch = l.match(
      /^(Morning|Breakfast|Lunch|Evening|Dinner):\s*(.+)/i
    );

    if (mealMatch && currentDay) {
      currentDay.meals.push({
        time: mealMatch[1],
        food: mealMatch[2]
      });
    }
  });

  return days;
}
