package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.List;

@Service
public class HuggingFaceService {

    @Value("${huggingface.api.key}")
    private String apiKey;

    private static final String MODEL_URL =
            "https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224";

    public String detectIngredientsFromImage(String base64Image) {

        try {
            // Decode base64 → image bytes
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);

            // IMPORTANT: do NOT force JSON input
            headers.setContentType(MediaType.IMAGE_JPEG);

            // HuggingFace requires JSON output
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));

            HttpEntity<byte[]> entity = new HttpEntity<>(imageBytes, headers);

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<String> response = restTemplate.exchange(
                    MODEL_URL,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            // 🔥 RETURN RAW HF JSON ARRAY
            return response.getBody();

        } catch (Exception e) {
            e.printStackTrace();
            return "[]"; // frontend-safe fallback
        }
    }
}
