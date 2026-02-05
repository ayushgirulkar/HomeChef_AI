package com.example.demo.controller;

import com.example.demo.service.GeminiService;
import com.example.demo.service.HuggingFaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "http://localhost:5173")
public class IngredientController {

    @Autowired
    private GeminiService geminiService;
    @Autowired
    private HuggingFaceService huggingFaceService;

    // STEP 1: Detect ingredients from image or text
    @PostMapping("/detect")
    public String detectIngredients(@RequestBody Map<String, String> data) {

        String base64Image = data.get("image"); // optional
        String manualText = data.get("text");   // optional

        String prompt = """
        You are a kitchen assistant.

        If image is provided, identify visible food ingredients.
        If text is provided, clean and normalize ingredient names.

        Return ONLY a comma-separated list of ingredients.

        Text: %s
        """.formatted(manualText == null ? "" : manualText);

        // For demo: text-based detection
        // (Image vision can be added later)
        return geminiService.generateContent(prompt);
    }

    // STEP 2: Generate recipe suggestions
    @PostMapping("/recipes")
    public String suggestRecipes(@RequestBody Map<String, String> data) {

        String ingredients = data.get("ingredients");
        String language = data.get("language");

        String prompt = """
    Using these ingredients:
    %s

    Suggest 5 Indian recipes.

    Return STRICT JSON like this:
    {
      "recipes": [
        {"name": "Recipe Name", "desc": "short description"},
        {"name": "Recipe Name", "desc": "short description"}
      ]
    }

    Language: %s
    """.formatted(ingredients, language);

        return geminiService.generateContent(prompt);
    }
    @PostMapping("/detect-image")
    public String detectFromImage(@RequestBody Map<String, String> data) {

        String base64 = data.get("image");

        if (base64 == null || base64.isEmpty()) {
            return "no image provided";
        }

        return huggingFaceService.detectIngredientsFromImage(base64);
    }
}






