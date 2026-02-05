export function parseRecipe(text) {
  const result = {
    title: "",
    ingredients: [],
    steps: [],
    tips: []
  };

  if (!text) return result;

  let section = "";

  text.split("\n").forEach(line => {
    const l = line.trim();

    if (l.startsWith("Title:")) {
      section = "title";
      result.title = l.replace("Title:", "").trim();
    } else if (l.startsWith("Ingredients:")) {
      section = "ingredients";
    } else if (l.startsWith("Steps:")) {
      section = "steps";
    } else if (l.startsWith("Cooking Tips:") || l.startsWith("Tips:")) {
      section = "tips";
    } else if (l && section === "ingredients") {
      result.ingredients.push(l.replace(/^[-•]/, "").trim());
    } else if (l && section === "steps") {
      result.steps.push(l.replace(/^\d+\./, "").trim());
    } else if (l && section === "tips") {
      result.tips.push(l.replace(/^[-•]/, "").trim());
    }
  });

  return result;
}
