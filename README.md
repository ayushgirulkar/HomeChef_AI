# 🍳 HomeChef_AI  
### AI-Powered Smart Cooking, Grocery & Fitness Assistant

HomeChef_AI is a **full-stack AI-powered application** that helps users **cook smarter, shop smarter, and eat healthier** using Artificial Intelligence.

It combines **AI recipe generation, ingredient detection from images, smart grocery search, gym meal planning, multilingual support, and PDF export** into one intelligent platform.

---

## 🚀 Problem Statement

In daily life, people face multiple food-related problems:

- ❌ Don’t know what to cook with available ingredients  
- ❌ Waste food due to poor planning  
- ❌ Confused while buying groceries  
- ❌ No personalized gym diet planning  
- ❌ Recipes not available in local languages  
- ❌ No single platform for cooking + grocery + fitness  

---

## ✅ Solution

**HomeChef_AI solves all these problems using AI** by providing:

- AI-powered recipe generation  
- Image-based ingredient detection  
- Smart grocery search using natural language  
- Personalized gym meal planning  
- Multilingual recipe support  
- Save, read, and download plans  

---

## ✨ Features

---

### 🍽️ Let’s Cook (AI Recipe Generator)
- Enter any dish name (e.g., *Rajma Chawal*)
- AI generates:
  - Ingredients
  - Step-by-step cooking instructions
  - Cooking tips
- Supported languages:
  - English
  - Hindi
  - Marathi
- 🔊 Text-to-Speech (Read recipe aloud)
- 📄 Download recipe as PDF
- ⭐ Save recipe to profile

---

### 📸 Smart Ingredients (Image → Recipe)
- Upload image of vegetables/fruits
- AI detects ingredients from image
- Edit detected ingredients manually
- Generate recipes using those ingredients
- Save recipes for later use

---

### 🛒 Smart Grocery Search (AI Search)
- Search groceries using **natural language**
- Example searches:
  - *"for making strawberry shake"*
  - *"healthy breakfast items"*
  - *"gym protein foods"*
- AI understands intent and returns **relevant grocery products**
- Filters products automatically
- Saves user time and avoids confusion while shopping

👉 This feature makes HomeChef_AI **more than just a recipe app** — it becomes a **smart kitchen assistant**.

---

### 🏋️ Gym Freak Meal Planner
- Personalized **weekly Indian gym meal plan**
- User inputs:
  - Fitness goal (Gain muscle / Lose weight / Maintain fitness)
  - Weight
  - Diet preference (Veg / Non-Veg)
  - Meals per day
- Clean **day-wise & meal-wise table**
- 🔊 Read meal plan aloud
- 📄 Download meal plan as PDF
- ⭐ Save meal plan (stored like recipes)

---

### ⭐ My Saved Recipes & Plans
- View all saved:
  - Recipes
  - Gym meal plans
- Read aloud anytime
- Download as PDF
- Delete when not needed

---

## 🌐 Multilingual Support
- English
- Hindi
- Marathi  

📄 PDF export supports **Indian languages** using **Noto Sans Devanagari Unicode font**

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- CSS
- jsPDF (PDF generation)
- Web Speech API (Text-to-Speech)

### Backend
- Java Spring Boot
- REST APIs
- JPA / Hibernate
- MySQL

### AI / ML
- Google Gemini API (Text-based AI)
- Ingredient Detection (extendable to YOLO)
- AI-powered Smart Search (context-based product filtering)

---

## 🗄️ Database Schema

```sql
CREATE DATABASE ai_kitchen;
USE ai_kitchen;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  mobile VARCHAR(20),
  email VARCHAR(100),
  password VARCHAR(100),
  avatar VARCHAR(10)
);

CREATE TABLE saved_recipes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  title VARCHAR(200),
  content TEXT
);

CREATE TABLE meal_plans (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  goal VARCHAR(50),
  plan_content TEXT
);

CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  category VARCHAR(50),
  price DOUBLE,
  image LONGTEXT
);
