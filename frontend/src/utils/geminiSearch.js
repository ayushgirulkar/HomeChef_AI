import api from "../services/api";

/**
 * Gemini-powered smart product search
 * Example input: "for making milk shake"
 */
export async function geminiSearch(query) {
  if (!query || !query.trim()) {
    return "Please enter a search query.";
  }

  try {
    const res = await api.post("/products/search", {
      query
    });

    /*
      Backend response examples:
      - "Milk, Banana, Sugar are available in store"
      - "Chocolate is not available in store"
    */

    return res.data;

  } catch (err) {
    console.error("Gemini search error:", err);
    return "Smart search failed. Please try again.";
  }
}
