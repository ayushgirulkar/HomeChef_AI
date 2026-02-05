package com.example.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=";

    // =====================================================
    // 1️⃣ TEXT GENERATION (Meal plan, search reasoning, etc.)
    // =====================================================
    public String generateContent(String prompt) {

        try {
            Map<String, Object> body = Map.of(
                    "contents", List.of(
                            Map.of(
                                    "parts", List.of(
                                            Map.of("text", prompt)
                                    )
                            )
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(body, headers);

            String response = restTemplate.postForObject(
                    GEMINI_URL + apiKey,
                    entity,
                    String.class
            );

            JsonNode root = mapper.readTree(response);

            if (!root.has("candidates") || root.get("candidates").isEmpty()) {
                return "NO_RESPONSE";
            }

            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "NO_RESPONSE";
        }
    }

    // =====================================================
    // 2️⃣ IMAGE → INGREDIENT DETECTION
    // =====================================================
    public String generateFromImage(String base64Image) {

        try {
            Map<String, Object> body = Map.of(
                    "contents", List.of(
                            Map.of(
                                    "parts", List.of(
                                            Map.of(
                                                    "inlineData", Map.of(
                                                            "mimeType", "image/jpeg",
                                                            "data", base64Image
                                                    )
                                            ),
                                            Map.of(
                                                    "text",
                                                    "Identify visible food ingredients. " +
                                                            "Return ONLY comma-separated names."
                                            )
                                    )
                            )
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(body, headers);

            String response = restTemplate.postForObject(
                    GEMINI_URL + apiKey,
                    entity,
                    String.class
            );

            JsonNode root = mapper.readTree(response);

            if (!root.has("candidates") || root.get("candidates").isEmpty()) {
                return "NO_INGREDIENTS";
            }

            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "NO_INGREDIENTS";
        }
    }

    // =====================================================
    // 3️⃣ 🆕 STORE PRODUCT SMART SEARCH (NEW)
    // =====================================================
    public String smartProductSearch(String userQuery, String availableProducts) {

        String prompt = """
        You are a smart grocery store assistant.

        Available products:
        %s

        User request:
        "%s"

        RULES:
        - Match logically (example: milkshake → milk, banana)
        - Return ONLY matching product names
        - Comma-separated
        - If nothing matches, return: NOT_AVAILABLE
        """
                .formatted(availableProducts, userQuery);

        return generateContent(prompt);
    }
}
