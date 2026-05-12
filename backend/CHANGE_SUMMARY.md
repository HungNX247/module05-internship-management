# Change Summary

## Ghi chú

- Tất cả chức năng bên dưới đều có kèm địa chỉ folder/file.
- Root source code: `src/main/java/com/codegym/internship`

## 1) Enums

Folder: `src/main/java/com/codegym/internship/user/enums`

- `Role.java`:
  - `ADMIN`, `HR`, `MENTOR`, `INTERN`
- `UserStatus.java`:
  - `ACTIVE`, `INACTIVE`

## 2) Entities

Folder: `src/main/java/com/codegym/internship/user/entity`

- `RoleEntity.java` (`roles`):
  - `id`, `code`, `name`, `description`, `createdAt`, `updatedAt`
- `User.java` (`users`):
  - `id`, `fullName`, `email`, `phone`, `passwordHash`, `role`, `status`, `createdAt`, `updatedAt`
  - `email`, `phone` unique
  - `role` map `@ManyToOne` sang `RoleEntity`
  - `status` mặc định `ACTIVE`

## 3) Repositories

Folder: `src/main/java/com/codegym/internship/user/repository`

- `UserRepository.java`:
  - `findByEmail(String email)`
  - `existsByEmail(String email)`
- `RoleRepository.java`:
  - `findByCode(Role code)`

## 4) Common Response

Folder: `src/main/java/com/codegym/internship/common/response`

- `ApiResponse.java`:
  - fields: `success`, `message`, `data`
  - factory methods: `success(...)`, `error(...)`

## 5) Global Exception Handler

Folder: `src/main/java/com/codegym/internship/common/exception`

- `GlobalExceptionHandler.java`:
  - `BadCredentialsException` -> `401`
  - `DisabledException` -> `403`
  - `AccessDeniedException` -> `403`
  - `MethodArgumentNotValidException` -> `400`
  - `Exception` -> `500`

## 6) BCrypt Password

Folder: `src/main/java/com/codegym/internship/security`

- `BCryptGenerator.java` để sinh hash test cho `123456`
- Hash mẫu: `$2a$10$WPw3YqbXkGb41qWOqX2cmu9BYtwkXmVdXfYV756gIk5M0qbEOom.a`

## 7) Spring Security + JWT

Folders/files:

- `build.gradle`: thêm `jjwt-api`, `jjwt-impl`, `jjwt-jackson`
- `src/main/resources/application.yml`: cấu hình `jwt.secret`, `jwt.expiration-ms`
- `src/main/java/com/codegym/internship/security`:
  - `JwtService.java`
  - `CustomUserDetailsService.java`
  - `JwtAuthenticationFilter.java`
  - `SecurityConfig.java`

Rule phân quyền:

- `POST /api/auth/login` -> public
- `/api/admin/**` -> `ADMIN`
- `/api/hr/**` -> `ADMIN`, `HR`
- `/api/mentor/**` -> `MENTOR`
- `/api/intern/**` -> `INTERN`
- còn lại -> authenticated

## 8) Auth API (Login / Me / Logout)

Folders/files:

- DTO: `src/main/java/com/codegym/internship/auth/dto`
  - `LoginRequest.java`
  - `CurrentUserResponse.java`
  - `LoginResponse.java`
- Service: `src/main/java/com/codegym/internship/auth/service/AuthService.java`
- Controller: `src/main/java/com/codegym/internship/auth/controller/AuthController.java`

Endpoints:

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

## 9) API Test Theo Role

Folder: `src/main/java/com/codegym/internship/testapi`

- `RoleTestController.java`
- Endpoint test:
  - `GET /api/admin/test`
  - `GET /api/hr/test`
  - `GET /api/mentor/test`
  - `GET /api/intern/test`

## 10) Seed User Mặc Định Để Test Postman

Folder: `src/main/java/com/codegym/internship/config`

- `DataInitializer.java`:
  - tự tạo role nếu chưa có
  - tự tạo user mặc định nếu chưa có
  - password mã hóa BCrypt
  - chạy idempotent (không tạo trùng)

Tài khoản mặc định:

- `admin@gmail.com` / `123456` -> `ADMIN`
- `hr@gmail.com` / `123456` -> `HR`
- `mentor@gmail.com` / `123456` -> `MENTOR`
- `intern@gmail.com` / `123456` -> `INTERN`


## 12) Compile Verification

Đã kiểm tra compile:

```bash
./gradlew -q classes
```

Kết quả: pass.

