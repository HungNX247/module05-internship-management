# Sprint 1 - FE-BE Auth Flow Checklist

## 1. Mục tiêu tài liệu

Tài liệu này dùng để kiểm tra flow tích hợp giữa Frontend và Backend cho chức năng Auth.

Người phụ trách: Nguyễn Xuân Hùng  
Vai trò: Integration / QA / Demo Owner

---

## 2. Mục tiêu kiểm tra

Không chỉ kiểm tra API bằng Postman, mà cần kiểm tra flow thực tế:

```text
Mở Login Page
→ nhập email/password
→ FE gọi BE
→ BE trả token
→ FE lưu token
→ FE gọi /me
→ FE redirect đúng dashboard
→ logout
→ xóa token
```

---

## 3. Flow Login thành công

| Step | Hành động | Kết quả mong muốn | Status | Note |
|---:|---|---|---|---|
| 1 | Mở `/login` | Hiển thị form login | To Do |  |
| 2 | Nhập email/password đúng | Input nhận dữ liệu | To Do |  |
| 3 | Bấm Đăng nhập | FE gọi `POST /api/auth/login` | To Do |  |
| 4 | Kiểm tra request body | Body có `email`, `password` | To Do |  |
| 5 | BE trả response | Có `success=true`, `data.token`, `data.user` | To Do |  |
| 6 | FE lưu token | Token được lưu vào localStorage/sessionStorage | To Do |  |
| 7 | FE lấy role | Role lấy từ `data.user.role` hoặc gọi `/me` | To Do |  |
| 8 | FE redirect | Điều hướng đúng dashboard theo role | To Do |  |

---

## 4. Flow Login sai mật khẩu

| Step | Hành động | Kết quả mong muốn | Status | Note |
|---:|---|---|---|---|
| 1 | Mở `/login` | Hiển thị form login | To Do |  |
| 2 | Nhập email đúng, password sai | Input nhận dữ liệu | To Do |  |
| 3 | Bấm Đăng nhập | FE gọi API login | To Do |  |
| 4 | BE trả lỗi | `success=false`, message lỗi | To Do |  |
| 5 | FE hiển thị lỗi | Hiển thị message trên màn hình | To Do |  |
| 6 | FE không lưu token | localStorage/sessionStorage không có token | To Do |  |
| 7 | Không redirect | Vẫn ở trang login | To Do |  |

---

## 5. Flow Auth Me

| Step | Hành động | Kết quả mong muốn | Status | Note |
|---:|---|---|---|---|
| 1 | User đã login | Token tồn tại | To Do |  |
| 2 | FE gọi `/api/auth/me` | Request có Authorization header | To Do |  |
| 3 | Header | `Authorization: Bearer <token>` | To Do |  |
| 4 | BE trả user | Có id, fullName, email, role, status | To Do |  |
| 5 | FE hiển thị thông tin user | Header/menu hiển thị đúng user | To Do |  |
| 6 | Không có passwordHash | Response không chứa passwordHash | To Do |  |

---

## 6. Flow Logout

| Step | Hành động | Kết quả mong muốn | Status | Note |
|---:|---|---|---|---|
| 1 | User đã login | Đang ở dashboard | To Do |  |
| 2 | Bấm Logout | FE gọi `POST /api/auth/logout` | To Do |  |
| 3 | FE xóa token | localStorage/sessionStorage không còn token | To Do |  |
| 4 | FE redirect | Về `/login` | To Do |  |
| 5 | User quay lại dashboard bằng URL | Bị chặn hoặc redirect về login | To Do |  |

---

## 7. Redirect theo role

| Role | Redirect mong muốn | Status | Note |
|---|---|---|---|
| ADMIN | `/admin/dashboard` | To Do |  |
| HR | `/hr/dashboard` | To Do |  |
| MENTOR | `/mentor/dashboard` | To Do |  |
| INTERN | `/intern/dashboard` | To Do |  |

---

## 8. Checklist tổng hợp T-021

- [ ] FE gọi đúng `POST /api/auth/login`.
- [ ] Request login có email/password.
- [ ] Login đúng nhận được token.
- [ ] Login sai hiển thị lỗi.
- [ ] Login sai không lưu token.
- [ ] FE lưu token đúng nơi thống nhất.
- [ ] FE gọi `/api/auth/me` có Authorization header.
- [ ] FE lấy đúng role từ response.
- [ ] FE redirect đúng role.
- [ ] Logout gọi đúng API.
- [ ] Logout xóa token.
- [ ] Logout quay về login.
- [ ] Sau logout không truy cập được dashboard private.

---

## 9. Definition of Done cho T-021

T-021 được coi là Done khi:

- [ ] Đã test flow login đúng.
- [ ] Đã test flow login sai.
- [ ] Đã test flow `/me`.
- [ ] Đã test flow logout.
- [ ] Đã xác nhận FE-BE gọi đúng endpoint.
- [ ] Đã xác nhận FE gửi token đúng header.
- [ ] Đã xác nhận redirect đúng role.
