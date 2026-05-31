# Integration Test Checklist — Module 05 (mock=false)

Chạy khi `VITE_HR_INTERN_MOCK=false` trong `.env` local và backend đang chạy.

## Chuẩn bị

- [ ] Backend API reachable (proxy Vite → BE)
- [ ] Có tài khoản test: ADMIN, HR, INTERN (intern chưa có profile + intern đã có profile DRAFT/SUBMITTED)

## Login theo role

| Role | Endpoint | Kỳ vọng |
|------|----------|---------|
| INTERN | `POST /api/auth/login` | 200, có token |
| HR | `POST /api/auth/login` | 200 |
| ADMIN | `POST /api/auth/login` | 200 |

## Luồng INTERN

| Bước | API | Status mong đợi |
|------|-----|-----------------|
| Vào `/intern/profile` | `GET /api/interns/me` | 200 (có profile) hoặc 404 (chưa có — UI form tạo mới) |
| Tạo hồ sơ | `POST /api/interns` | 201/200 |
| Cập nhật DRAFT | `PUT /api/interns/{id}` | 200 |
| Upload tài liệu | `POST /api/documents/upload` | 200/201 |
| List tài liệu | `GET /api/interns/{id}/documents` | 200 |
| Tải file | `GET /api/documents/{id}/download` | 200 |
| Nộp hồ sơ | `PATCH /api/interns/{id}/submit` | 200, status=SUBMITTED |
| F5 `/intern/profile` | `GET /api/interns/me` | 200, status SUBMITTED, form khóa |

## Luồng HR / ADMIN

| Bước | API | Status mong đợi |
|------|-----|-----------------|
| HR vào `/hr/dashboard` | — | UI OK |
| HR list intern | `GET /api/interns?page=0&size=10` | 200 |
| HR chi tiết | `GET /api/interns/{id}` | 200 |
| HR documents | `GET /api/interns/{id}/documents` | 200 |
| ADMIN vào `/hr/interns` | `GET /api/interns` | 200 (role ADMIN được phép) |

## Lỗi cần verify message tiếng Việt

- [ ] Upload file quá lớn → 413 → "File vượt quá dung lượng cho phép"
- [ ] User không quyền → 403 → "Bạn không có quyền thực hiện thao tác này"
- [ ] Submit profile đã SUBMITTED → 409 → message từ BE hoặc fallback xung đột
- [ ] Mất mạng / BE down → "Không kết nối được tới máy chủ"
