package com.example.demo.controller;

import com.example.demo.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/meal-planner")
@CrossOrigin(origins = "http://localhost:5173")
public class MealPlannerController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/generate")
    public String generateMealPlan(@RequestBody Map<String, String> data) {

        String goal = data.get("goal");
        String weight = data.get("weight");
        String diet = data.get("diet");
        String meals = data.get("meals");
        String language = data.get("language");

        String prompt = """
You are a fitness nutrition expert.

Create a weekly Indian gym meal plan in %s language.

User details:
Goal: %s
Weight: %s kg
Diet: %s
Meals per day: %s

CRITICAL RULES (MUST FOLLOW):
- DO NOT write any introduction or explanation
- Output MUST start with: Day: Monday
- DO NOT skip any meal
- Every meal line MUST contain real food (NO empty, NO dash, NO brackets)
- Use simple Indian food names only
- One line per meal only

STRICT FORMAT (DO NOT CHANGE WORDS OR ORDER):

Day: Monday
Morning: Banana and 5 almonds
Breakfast: Paneer bhurji with 2 whole wheat rotis
Lunch: Dal, brown rice and mixed vegetable sabzi
Evening: Roasted chana or sprouts salad
Dinner: Tofu or paneer with vegetables

Day: Tuesday
Morning: Banana and peanuts
Breakfast: Oats with milk and nuts
Lunch: Rajma with rice and salad
Evening: Fruit bowl and curd
Dinner: Vegetable dal with roti

Repeat SAME structure for Wednesday, Thursday, Friday, Saturday.
""".formatted(language, goal, weight, diet, meals);


        return geminiService.generateContent(prompt);
    }
}
