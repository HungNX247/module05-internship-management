# Backend - Internship Management System

## Công nghệ
- Java 21
- Spring Boot
- Gradle
- Spring Web
- Spring Security
- Spring Data JPA
- Validation
- MySQL
- Lombok

## Cách chạy backend

### 1. Tạo database
CREATE DATABASE internship_management
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

### 2. Cấu hình database
Mở file src/main/resources/application.yml và sửa username/password MySQL theo máy local.

### 3. Chạy project
./gradlew bootRun

Windows:
.\gradlew bootRun

Backend chạy tại http://localhost:8080