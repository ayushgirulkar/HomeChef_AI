package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private GeminiService geminiService;

    // =========================
    // ADD PRODUCT (ADMIN)
    // =========================
    @PostMapping("/add")
    public String addProduct(@RequestBody Product product) {
        productRepository.save(product);
        return "Product added successfully";
    }

    // =========================
    // GET ALL PRODUCTS
    // =========================
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // =========================
    // SMART SEARCH (GEMINI)
    // =========================
    @PostMapping("/search")
    public String smartSearch(@RequestBody Map<String, String> data) {

        String query = data.get("query");

        String productNames = productRepository.findAll()
                .stream()
                .map(Product::getName)
                .reduce("", (a, b) -> a + ", " + b);

        String prompt = """
        You are a grocery store assistant.

        User query: "%s"

        Available products:
        %s

        TASK:
        - If relevant items are available, list their names
        - If nothing matches, say: "Item not available in store now"
        """.formatted(query, productNames);

        return geminiService.generateContent(prompt);
    }
}
