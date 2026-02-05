package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        userRepository.save(user);
        return ResponseEntity.ok("Signup successful");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {

        String email = data.get("email");
        String password = data.get("password");

        // 🔐 ADMIN LOGIN (HARDCODED)
        if (email.equals("ayush@gmail.com") && password.equals("pass12345")) {
            User admin = new User();
            admin.setId(0L);
            admin.setName("Admin");
            admin.setEmail(email);
            admin.setPassword(""); // do not expose password
            admin.setAvatar("male");
            admin.setRole("ADMIN"); // IMPORTANT

            return ResponseEntity.ok(admin);
        }

        // 👤 NORMAL USER LOGIN
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            user.get().setRole("USER"); // optional but good
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
