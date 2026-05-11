# Sprint 1 - Permission Test Cases

## 1. Mục tiêu tài liệu

Tài liệu này mô tả test case phân quyền theo role cho Sprint 1.

Người phụ trách: Nguyễn Xuân Hùng  
Vai trò: BA / QA / Scrum Master / Integration / Demo Owner

---

## 2. Rule phân quyền dự kiến

| API | Role được phép |
|---|---|
| `/api/admin/**` | ADMIN |
| `/api/hr/**` | ADMIN, HR |
| `/api/mentor/**` | MENTOR |
| `/api/intern/**` | INTERN |
| `/api/auth/me` | User đã login |
| `/api/auth/logout` | User đã login |

---

## 3. API test phân quyền

| API | Method | Mục đích |
|---|---|---|
| `/api/admin/test` | GET | Kiểm tra quyền ADMIN |
| `/api/hr/test` | GET | Kiểm tra quyền HR |
| `/api/mentor/test` | GET | Kiểm tra quyền MENTOR |
| `/api/intern/test` | GET | Kiểm tra quyền INTERN |

---

## 4. Ma trận quyền

| API | Không login | ADMIN | HR | MENTOR | INTERN |
|---|---:|---:|---:|---:|---:|
| `POST /api/auth/login` | Pass | Pass | Pass | Pass | Pass |
| `GET /api/auth/me` | Fail | Pass | Pass | Pass | Pass |
| `POST /api/auth/logout` | Fail | Pass | Pass | Pass | Pass |
| `GET /api/admin/test` | Fail | Pass | Fail | Fail | Fail |
| `GET /api/hr/test` | Fail | Pass | Pass | Fail | Fail |
| `GET /api/mentor/test` | Fail | Fail | Fail | Pass | Fail |
| `GET /api/intern/test` | Fail | Fail | Fail | Fail | Pass |

---

## 5. Test case chi tiết

| Testcase ID | Module | Title | Pre-condition | Steps | Test data | Expected result | Priority | Status |
|---|---|---|---|---|---|---|---|---|
| PERM_001 | Permission | Không login gọi admin API | Không có token | Gọi GET `/api/admin/test` | Không truyền Authorization | HTTP 401/403, không truy cập được | Cao | To Do |
| PERM_002 | Permission | ADMIN truy cập admin API | Có token ADMIN | Gọi GET `/api/admin/test` | Authorization: Bearer ADMIN token | HTTP 200, truy cập thành công | Cao | To Do |
| PERM_003 | Permission | HR không được truy cập admin API | Có token HR | Gọi GET `/api/admin/test` | Authorization: Bearer HR token | HTTP 403 | Cao | To Do |
| PERM_004 | Permission | MENTOR không được truy cập admin API | Có token MENTOR | Gọi GET `/api/admin/test` | Authorization: Bearer MENTOR token | HTTP 403 | Cao | To Do |
| PERM_005 | Permission | INTERN không được truy cập admin API | Có token INTERN | Gọi GET `/api/admin/test` | Authorization: Bearer INTERN token | HTTP 403 | Cao | To Do |
| PERM_006 | Permission | ADMIN truy cập HR API | Có token ADMIN | Gọi GET `/api/hr/test` | ADMIN token | HTTP 200 | Cao | To Do |
| PERM_007 | Permission | HR truy cập HR API | Có token HR | Gọi GET `/api/hr/test` | HR token | HTTP 200 | Cao | To Do |
| PERM_008 | Permission | MENTOR không được truy cập HR API | Có token MENTOR | Gọi GET `/api/hr/test` | MENTOR token | HTTP 403 | Cao | To Do |
| PERM_009 | Permission | INTERN không được truy cập HR API | Có token INTERN | Gọi GET `/api/hr/test` | INTERN token | HTTP 403 | Cao | To Do |
| PERM_010 | Permission | MENTOR truy cập Mentor API | Có token MENTOR | Gọi GET `/api/mentor/test` | MENTOR token | HTTP 200 | Cao | To Do |
| PERM_011 | Permission | ADMIN không truy cập Mentor API nếu rule chỉ cho MENTOR | Có token ADMIN | Gọi GET `/api/mentor/test` | ADMIN token | HTTP 403 | Trung bình | To Do |
| PERM_012 | Permission | INTERN truy cập Intern API | Có token INTERN | Gọi GET `/api/intern/test` | INTERN token | HTTP 200 | Cao | To Do |
| PERM_013 | Permission | ADMIN không truy cập Intern API nếu rule chỉ cho INTERN | Có token ADMIN | Gọi GET `/api/intern/test` | ADMIN token | HTTP 403 | Trung bình | To Do |
| PERM_014 | Permission | Token sai gọi private API | Token không hợp lệ | Gọi GET `/api/admin/test` | Authorization: Bearer invalid-token | HTTP 401/403 | Cao | To Do |
| PERM_015 | Permission | Token rỗng gọi private API | Header Bearer rỗng | Gọi GET `/api/admin/test` | Authorization: Bearer | HTTP 401/403 | Cao | To Do |
| PERM_016 | Permission | Token hợp lệ nhưng sai role | Có token INTERN | Gọi GET `/api/hr/test` | INTERN token | HTTP 403 | Cao | To Do |
| PERM_017 | Permission | Gọi `/api/auth/me` với token ADMIN | Có token ADMIN | Gọi GET `/api/auth/me` | ADMIN token | HTTP 200, trả user ADMIN | Cao | To Do |
| PERM_018 | Permission | Gọi `/api/auth/me` không token | Không có token | Gọi GET `/api/auth/me` | Không truyền Authorization | HTTP 401/403 | Cao | To Do |

---

## 6. Ghi chú cần thống nhất với team

### ADMIN có được truy cập tất cả API không?

Hiện rule dự kiến:

```text
/api/admin/**  -> ADMIN
/api/hr/**     -> ADMIN, HR
/api/mentor/** -> MENTOR
/api/intern/** -> INTERN
```

Theo rule này:

- ADMIN vào được `/api/admin/**`.
- ADMIN vào được `/api/hr/**`.
- ADMIN chưa chắc vào được `/api/mentor/**`.
- ADMIN chưa chắc vào được `/api/intern/**`.

Nếu team muốn ADMIN có toàn quyền, cần sửa rule thành:

```text
/api/mentor/** -> ADMIN, MENTOR
/api/intern/** -> ADMIN, INTERN
```

Cần chốt rõ trước khi test để tránh hiểu sai expected result.

---

## 7. Definition of Done cho T-020

T-020 được coi là Done khi:

- [ ] Có ma trận quyền.
- [ ] Có test case không login.
- [ ] Có test case đúng role.
- [ ] Có test case sai role.
- [ ] Có test case token sai.
- [ ] Có test case token rỗng.
- [ ] Có ghi chú rõ ADMIN có được vào toàn bộ API hay không.
