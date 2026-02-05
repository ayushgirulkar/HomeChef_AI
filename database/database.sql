-- Database: AI Kitchen
CREATE DATABASE IF NOT EXISTS ai_kitchen;
USE ai_kitchen;

-- ========================
-- USERS TABLE
-- ========================
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  mobile VARCHAR(20),
  email VARCHAR(100),
  password.entities VARCHAR(100),
  avatar VARCHAR(10)
);

-- ========================
-- SAVED RECIPES
-- ========================
CREATE TABLE saved_recipes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  title VARCHAR(200),
  content TEXT
);

-- ========================
-- MEAL PLANS
-- ========================
CREATE TABLE meal_plans (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  goal VARCHAR(50),
  plan_content TEXT
);

-- ========================
-- PRODUCTS (FUTURE FEATURE)
-- ========================
CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  price DOUBLE NOT NULL,
  image LONGTEXT
);
