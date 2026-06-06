# Sprint 1 - Auth Acceptance Criteria

## 1. Mục tiêu tài liệu

Tài liệu này mô tả tiêu chí nghiệm thu cho các chức năng Auth trong Sprint 1.

Người phụ trách: Nguyễn Xuân Hùng  
Vai trò: Nhóm trưởng / BA / QA / Scrum Master / Integration / Demo Owner

Các chức năng thuộc phạm vi Sprint 1:

- Login
- Logout
- Auth Me
- Token/JWT
- Role-based permission
- Không lộ thông tin nhạy cảm

---

## 2. API nằm trong phạm vi kiểm tra

| API | Method | Mục đích | Ghi chú |
|---|---|---|---|
| `/api/auth/login` | POST | Đăng nhập | Public API |
| `/api/auth/me` | GET | Lấy thông tin user hiện tại | Cần token |
| `/api/auth/logout` | POST | Đăng xuất | Cần token |
| `/api/admin/test` | GET | Test quyền ADMIN | Cần role ADMIN |
| `/api/hr/test` | GET | Test quyền HR | Cần role ADMIN hoặc HR |
| `/api/mentor/test` | GET | Test quyền MENTOR | Cần role MENTOR |
| `/api/intern/test` | GET | Test quyền INTERN | Cần role INTERN |

---

## 3. Response format chuẩn

Tất cả API Auth nên trả theo format:

```json
{
  "success": true,
  "message": "Message",
  "data": {}
}
```

Khi lỗi:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

---

## 4. Acceptance Criteria chi tiết

### AC-AUTH-001 - Login thành công với tài khoản ACTIVE

**Given**

- User tồn tại trong hệ thống.
- User có status = `ACTIVE`.
- User nhập đúng email và password.

**When**

- Gọi API `POST /api/auth/login`.

**Then**

- Hệ thống trả HTTP `200`.
- Response có `success = true`.
- Response có `message = "Login successful"`.
- Response có `data.token`.
- Response có `data.user`.
- `data.user` có các field:
  - `id`
  - `fullName`
  - `email`
  - `role`
  - `status`
- `data.user.role` đúng với role trong hệ thống.
- Response không được trả `password`.
- Response không được trả `passwordHash`.

**Response mong muốn**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": 1,
      "fullName": "System Admin",
      "email": "admin@gmail.com",
      "role": "ADMIN",
      "status": "ACTIVE"
    }
  }
}
```

---

### AC-AUTH-002 - Login thất bại khi password sai

**Given**

- Email tồn tại trong hệ thống.
- User có status = `ACTIVE`.
- User nhập sai password.

**When**

- Gọi API `POST /api/auth/login`.

**Then**

- Hệ thống không cho đăng nhập.
- Response có `success = false`.
- Response có `message = "Invalid email or password"`.
- Response không có token.
- Response không trả `passwordHash`.

**Response mong muốn**

```json
{
  "success": false,
  "message": "Invalid email or password",
  "data": null
}
```

---

### AC-AUTH-003 - Login thất bại khi email không tồn tại

**Given**

- Email không tồn tại trong hệ thống.

**When**

- Gọi API `POST /api/auth/login`.

**Then**

- Hệ thống không cho đăng nhập.
- Response có `success = false`.
- Response có `message = "Invalid email or password"`.
- Response không có token.
- Hệ thống không tiết lộ email có tồn tại hay không.

**Lưu ý**

Không nên trả message kiểu:

```text
Email not found
```

Vì message này có thể làm lộ email nào đang tồn tại trong hệ thống.

Nên dùng chung:

```text
Invalid email or password
```

---

### AC-AUTH-004 - Login thất bại khi user INACTIVE

**Given**

- User tồn tại.
- User có status = `INACTIVE`.
- User nhập đúng email/password.

**When**

- Gọi API `POST /api/auth/login`.

**Then**

- Hệ thống không cho đăng nhập.
- Response có `success = false`.
- Response có `message = "User is inactive"`.
- Response không có token.

---

### AC-AUTH-005 - Login thất bại khi email rỗng

**Given**

- User không nhập email.

**When**

- Gọi API `POST /api/auth/login`.

**Then**

- Hệ thống trả lỗi validate.
- Response có `success = false`.
- Message thể hiện lỗi validation.
- Không trả token.

---

### AC-AUTH-006 - Login thất bại khi password rỗng

**Given**

- User không nhập password.

**When**

- Gọi API `POST /api/auth/login`.

**Then**

- Hệ thống trả lỗi validate.
- Response có `success = false`.
- Không trả token.

---

### AC-AUTH-007 - Login thất bại khi email sai format

**Given**

- User nhập email không đúng định dạng.
- Ví dụ:
  - `abc`
  - `test@`
  - `test.com`

**When**

- Gọi API `POST /api/auth/login`.

**Then**

- Hệ thống trả lỗi validate email.
- Không xử lý đăng nhập.
- Không trả token.

---

### AC-AUTH-008 - Auth Me thành công

**Given**

- User đã login thành công.
- User có token hợp lệ.

**When**

- Gọi API `GET /api/auth/me`.
- Header có:

```text
Authorization: Bearer <token>
```

**Then**

- Hệ thống trả HTTP `200`.
- Response có `success = true`.
- Response trả thông tin user hiện tại.
- Response có role.
- Response không trả `passwordHash`.

**Response mong muốn**

```json
{
  "success": true,
  "message": "Get current user successfully",
  "data": {
    "id": 1,
    "fullName": "System Admin",
    "email": "admin@gmail.com",
    "role": "ADMIN",
    "status": "ACTIVE"
  }
}
```

---

### AC-AUTH-009 - Không cho gọi `/me` nếu chưa đăng nhập

**Given**

- User chưa login.
- Không có token.

**When**

- Gọi API `GET /api/auth/me`.

**Then**

- Hệ thống chặn truy cập.
- Response trả HTTP `401` hoặc `403`.
- Không trả thông tin user.

---

### AC-AUTH-010 - Không cho gọi `/me` nếu token không hợp lệ

**Given**

- User gửi token sai, token bị sửa hoặc token hết hạn.

**When**

- Gọi API `GET /api/auth/me`.
- Header có:

```text
Authorization: Bearer <invalid-token>
```

**Then**

- Hệ thống chặn truy cập.
- Không trả thông tin user.

---

### AC-AUTH-011 - Logout thành công

**Given**

- User đã login.
- User có token hợp lệ.

**When**

- Gọi API `POST /api/auth/logout`.

**Then**

- Backend trả `success = true`.
- Frontend xóa token khỏi `localStorage` hoặc `sessionStorage`.
- Frontend chuyển user về màn hình login.
- User không truy cập được dashboard nếu chưa login lại.

**Response mong muốn**

```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

### AC-AUTH-012 - Không response passwordHash

**Given**

- User gọi login hoặc `/me` thành công.

**When**

- Kiểm tra response trả về.

**Then**

- Response không chứa `password`.
- Response không chứa `passwordHash`.
- Response không chứa thông tin nhạy cảm.

---

## 5. Definition of Done cho T-018

T-018 được coi là Done khi:

- [ ] Có acceptance criteria cho login thành công.
- [ ] Có acceptance criteria cho login sai password.
- [ ] Có acceptance criteria cho email không tồn tại.
- [ ] Có acceptance criteria cho user inactive.
- [ ] Có acceptance criteria cho validate email/password.
- [ ] Có acceptance criteria cho `/me`.
- [ ] Có acceptance criteria cho logout.
- [ ] Có acceptance criteria cho không lộ `passwordHash`.
