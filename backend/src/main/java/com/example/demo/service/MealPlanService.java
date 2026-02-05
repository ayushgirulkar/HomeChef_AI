package com.example.demo.service;

import com.example.demo.entity.MealPlan;
import com.example.demo.repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MealPlanService {

    @Autowired
    private MealPlanRepository mealRepo;

    @Transactional
    public void saveMealPlan(MealPlan mealPlan) {

        if (mealPlan.getUserId() == null) {
            throw new RuntimeException("UserId missing");
        }

        if (mealPlan.getPlanContent() == null || mealPlan.getPlanContent().isBlank()) {
            throw new RuntimeException("Plan content empty");
        }

        mealRepo.save(mealPlan);
    }
    public List<MealPlan> getMealsByUser(Long userId) {
        return mealRepo.findByUserId(userId);
    }


}
