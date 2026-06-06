# Sprint 1 - Auth Test Cases

## 1. Mục tiêu tài liệu

Tài liệu này mô tả test case cho chức năng Login/Auth trong Sprint 1.

Người phụ trách: Nguyễn Xuân Hùng  
Vai trò: BA / QA / Scrum Master / Integration / Demo Owner

---

## 2. Phạm vi test

Các nhóm case chính:

- Login thành công.
- Login sai mật khẩu.
- Login email không tồn tại.
- Login thiếu email/password.
- Login email sai format.
- Login user INACTIVE.
- Kiểm tra response không trả `passwordHash`.

---

## 3. Điều kiện chung trước khi test

Cần chuẩn bị dữ liệu test trong database.

### User ADMIN active

| Field | Value |
|---|---|
| email | `admin@gmail.com` |
| password | `123456` |
| role | `ADMIN` |
| status | `ACTIVE` |

### User HR active

| Field | Value |
|---|---|
| email | `hr@gmail.com` |
| password | `123456` |
| role | `HR` |
| status | `ACTIVE` |

### User MENTOR active

| Field | Value |
|---|---|
| email | `mentor@gmail.com` |
| password | `123456` |
| role | `MENTOR` |
| status | `ACTIVE` |

### User INTERN active

| Field | Value |
|---|---|
| email | `intern@gmail.com` |
| password | `123456` |
| role | `INTERN` |
| status | `ACTIVE` |

### User inactive

| Field | Value |
|---|---|
| email | `inactive@gmail.com` |
| password | `123456` |
| role | tùy ý |
| status | `INACTIVE` |

---

## 4. Endpoint test

```http
POST /api/auth/login
```

Request body mẫu:

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

---

## 5. Danh sách test case

| Testcase ID | Module | Title | Pre-condition | Steps | Test data | Expected result | Priority | Status |
|---|---|---|---|---|---|---|---|---|
| AUTH_LOGIN_001 | Auth | Login thành công với tài khoản ADMIN | Có user ADMIN status ACTIVE, password đã mã hóa BCrypt | 1. Gọi POST `/api/auth/login` <br> 2. Nhập email/password đúng <br> 3. Kiểm tra response | email: `admin@gmail.com` <br> password: `123456` | HTTP 200, `success=true`, có token, `user.role=ADMIN`, không có `passwordHash` | Cao | To Do |
| AUTH_LOGIN_002 | Auth | Login sai mật khẩu | Có user ADMIN status ACTIVE | 1. Gọi POST `/api/auth/login` <br> 2. Nhập password sai | email: `admin@gmail.com` <br> password: `wrongpass` | Không login được, `success=false`, message=`Invalid email or password`, không có token | Cao | To Do |
| AUTH_LOGIN_003 | Auth | Login với email không tồn tại | Email chưa tồn tại trong DB | 1. Gọi POST `/api/auth/login` <br> 2. Nhập email không tồn tại | email: `notfound@gmail.com` <br> password: `123456` | Không login được, không có token, message không tiết lộ email có tồn tại hay không | Cao | To Do |
| AUTH_LOGIN_004 | Auth | Login thiếu email | N/A | 1. Gọi POST `/api/auth/login` <br> 2. Để email rỗng | email: `""` <br> password: `123456` | Validation error, không trả token | Cao | To Do |
| AUTH_LOGIN_005 | Auth | Login thiếu password | N/A | 1. Gọi POST `/api/auth/login` <br> 2. Để password rỗng | email: `admin@gmail.com` <br> password: `""` | Validation error, không trả token | Cao | To Do |
| AUTH_LOGIN_006 | Auth | Login email sai format | N/A | 1. Gọi POST `/api/auth/login` <br> 2. Nhập email sai format | email: `abc` <br> password: `123456` | Validation error email format | Trung bình | To Do |
| AUTH_LOGIN_007 | Auth | Login user INACTIVE | Có user status INACTIVE | 1. Gọi POST `/api/auth/login` <br> 2. Nhập đúng email/password | email: `inactive@gmail.com` <br> password: `123456` | Không login được, message=`User is inactive`, không có token | Cao | To Do |
| AUTH_LOGIN_008 | Auth | Kiểm tra response login không trả passwordHash | Login thành công | 1. Login thành công <br> 2. Kiểm tra response body | admin account | Response không chứa `password`, `passwordHash` | Cao | To Do |
| AUTH_LOGIN_009 | Auth | Login với khoảng trắng đầu/cuối email | Có user admin ACTIVE | 1. Gọi login <br> 2. Nhập email có khoảng trắng | email: `" admin@gmail.com "` <br> password: `123456` | Tùy thống nhất: trim email và login được hoặc validate fail rõ ràng | Trung bình | To Do |
| AUTH_LOGIN_010 | Auth | Login nhiều lần liên tiếp với cùng user | Có user admin ACTIVE | 1. Gọi login lần 1 <br> 2. Gọi login lần 2 | admin account | Cả 2 lần login thành công, token hợp lệ | Thấp | To Do |
| AUTH_LOGIN_011 | Auth | Login với password đúng nhưng email viết hoa | Có user admin ACTIVE | 1. Gọi login với email viết hoa | email: `ADMIN@GMAIL.COM` <br> password: `123456` | Tùy thống nhất: email không phân biệt hoa thường hoặc báo sai thông tin | Thấp | To Do |

---

## 6. Giải thích các case quan trọng

### AUTH_LOGIN_001 - Login thành công

Đây là case positive quan trọng nhất. Nếu case này fail thì toàn bộ flow auth chưa chạy được.

Cần kiểm tra kỹ:

- Có token không?
- Role có đúng không?
- Có trả `passwordHash` không?
- Response có đúng format `success/message/data` không?

---

### AUTH_LOGIN_002 và AUTH_LOGIN_003 - Sai password / Email không tồn tại

Hai case này nên trả cùng message:

```text
Invalid email or password
```

Không nên trả:

```text
Password incorrect
Email not found
```

Lý do: tránh làm lộ thông tin tài khoản nào đang tồn tại.

---

### AUTH_LOGIN_007 - User inactive

Case này kiểm tra user bị khóa. Dù nhập đúng password thì vẫn không được login.

---

### AUTH_LOGIN_008 - Không trả passwordHash

Đây là case bảo mật quan trọng. Dù login thành công, response cũng không được chứa:

- `password`
- `passwordHash`
- `password_hash`

---

## 7. Definition of Done cho T-019

T-019 được coi là Done khi:

- [ ] Có test case login thành công.
- [ ] Có test case sai mật khẩu.
- [ ] Có test case email không tồn tại.
- [ ] Có test case thiếu email.
- [ ] Có test case thiếu password.
- [ ] Có test case email sai format.
- [ ] Có test case user inactive.
- [ ] Có test case không lộ `passwordHash`.
