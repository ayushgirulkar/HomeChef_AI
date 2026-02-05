package com.example.demo.controller;

import com.example.demo.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/recipe")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/lets-cook")
    public String generateRecipe(@RequestBody Map<String, String> data) {

        String dish = data.get("dish");
        String language = normalizeLanguage(data.get("language"));

        String prompt = """
        Generate a well-structured cooking recipe in %s language.

        Dish name: %s

        Format STRICTLY like this:

        Title:
        <Recipe Name>

        Ingredients:
        - item 1
        - item 2

        Steps:
        1. step one
        2. step two

        Cooking Tips:
        - tip 1
        - tip 2
        """.formatted(language, dish);

        return geminiService.generateContent(prompt);
    }

    @PostMapping("/from-name")
    public String generateFromName(@RequestBody Map<String, String> data) {

        String recipeName = data.get("recipe");
        String language = normalizeLanguage(data.get("language"));

        String prompt = """
        Generate a detailed cooking recipe in %s language.

        Recipe name: %s

        Format STRICTLY as:

        Title:
        <title>

        Ingredients:
        - item

        Steps:
        1. step

        Tips:
        - tip
        """.formatted(language, recipeName);

        return geminiService.generateContent(prompt);
    }

    // ✅ HELPER METHOD
    private String normalizeLanguage(String lang) {
        if (lang == null) return "English";

        return switch (lang.toLowerCase()) {
            case "hindi" -> "Hindi";
            case "marathi" -> "Marathi";
            default -> "English";
        };
    }
    @GetMapping("/test-gemini")
    public String testGemini() {
        return geminiService.generateContent("Say hello in one sentence.");
    }
}
