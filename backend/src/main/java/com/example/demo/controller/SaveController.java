package com.example.demo.controller;

import com.example.demo.entity.MealPlan;
import com.example.demo.entity.SavedRecipe;
import com.example.demo.repository.MealPlanRepository;
import com.example.demo.repository.SavedRecipeRepository;
import com.example.demo.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/save")
@CrossOrigin(origins = "http://localhost:5173")
public class SaveController {

    @Autowired
    private SavedRecipeRepository recipeRepo;

    @Autowired
    private MealPlanRepository mealRepo;

    @Autowired
    private MealPlanService mealPlanService;

    // SAVE RECIPE
    @PostMapping("/recipe")
    public String saveRecipe(@RequestBody SavedRecipe recipe) {
        recipeRepo.save(recipe);
        return "Recipe saved";
    }

    // GET SAVED RECIPES
    @GetMapping("/recipes/{userId}")
    public List<SavedRecipe> getRecipes(@PathVariable Long userId) {
        return recipeRepo.findByUserId(userId);
    }

    // SAVE MEAL PLAN
    // SAVE MEAL PLAN
    @PostMapping("/meal")
    public String saveMeal(@RequestBody MealPlan mealPlan) {

        SavedRecipe recipe = new SavedRecipe();
        recipe.setUserId(mealPlan.getUserId());
        recipe.setTitle("Gym Meal Plan (" + mealPlan.getGoal() + ")");
        recipe.setContent(mealPlan.getPlanContent());

        recipeRepo.save(recipe);

        return "Meal plan saved";
    }


    // GET MEAL PLANS
    @GetMapping("/meals/{userId}")
    public List<MealPlan> getMeals(@PathVariable Long userId) {
        return mealPlanService.getMealsByUser(userId);
    }
    // DELETE ONE SAVED RECIPE
    @DeleteMapping("/recipe/{id}")
    public String deleteRecipe(@PathVariable Long id) {
        recipeRepo.deleteById(id);
        return "Recipe deleted";
    }
}
