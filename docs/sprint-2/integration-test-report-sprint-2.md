# Sprint 2 - Integration Test Report

## Flow: Intern nộp hồ sơ → HR xem hồ sơ

---

## 1. Mục tiêu

Tài liệu này dùng để ghi nhận kết quả test tích hợp Sprint 2.

Flow tích hợp chính:

```text
Intern đăng nhập
→ Intern tạo/cập nhật hồ sơ
→ Intern upload CV/đơn
→ Intern nộp hồ sơ
→ HR đăng nhập
→ HR xem danh sách hồ sơ
→ HR mở chi tiết hồ sơ
→ HR xem tài liệu của intern
```

Mục tiêu kiểm tra:

- FE Intern gọi đúng API.
- BE lưu đúng hồ sơ.
- BE lưu đúng tài liệu.
- HR xem được danh sách hồ sơ.
- HR xem được chi tiết hồ sơ và tài liệu.
- Quyền Intern/HR hoạt động đúng.

---

## 2. Môi trường test

| Mục | Giá trị |
|---|---|
| Sprint | Sprint 2 |
| Backend | http://localhost:8080 |
| Frontend | http://localhost:5173 |
| Database | MySQL internship_management |
| Tester | Nguyễn Xuân Hùng |
| Test date |  |
| Build/Branch |  |

---

## 3. Tài khoản test

| Role | Email | Password | Ghi chú |
|---|---|---|---|
| INTERN | intern@gmail.com | 123456 | Intern tạo/nộp hồ sơ |
| HR | hr@gmail.com | 123456 | HR xem hồ sơ |
| ADMIN | admin@gmail.com | 123456 | Dùng khi cần kiểm tra quyền quản trị |

---

## 4. Dữ liệu test hồ sơ intern

| Field | Value |
|---|---|
| fullName | Nguyễn Văn Intern |
| email | intern.profile@gmail.com |
| phone | 0912345678 |
| school | Đại học Công nghiệp Hà Nội |
| major | Công nghệ thông tin |
| academicYear | Năm 4 |
| gpa | 3.2 |

---

## 5. Dữ liệu test tài liệu

| Loại tài liệu | File | Expected |
|---|---|---|
| CV | cv.pdf < 5MB | Upload thành công |
| Đơn xin thực tập | application.docx < 5MB | Upload thành công |
| File sai định dạng | file.exe | Bị từ chối |
| File quá dung lượng | large-cv.pdf > 5MB | Bị từ chối |

---

## 6. Flow test tích hợp chính

| Step | Người thực hiện | Hành động | Expected | Actual | Status |
|---|---|---|---|---|---|
| 1 | Intern | Login vào hệ thống | Redirect vào dashboard intern |  |  |
| 2 | Intern | Mở màn hình nộp hồ sơ | Form hiển thị đủ field |  |  |
| 3 | Intern | Nhập thông tin hợp lệ | Validate không báo lỗi |  |  |
| 4 | Intern | Lưu hồ sơ | Hồ sơ được tạo, status Draft |  |  |
| 5 | Intern | Upload CV PDF < 5MB | Upload thành công |  |  |
| 6 | Intern | Upload đơn xin thực tập DOCX < 5MB | Upload thành công |  |  |
| 7 | Intern | Bấm Nộp hồ sơ | Status chuyển Submitted |  |  |
| 8 | HR | Login hệ thống | Redirect vào dashboard HR |  |  |
| 9 | HR | Mở danh sách intern | Thấy hồ sơ intern vừa nộp |  |  |
| 10 | HR | Filter theo status Submitted | Danh sách lọc đúng |  |  |
| 11 | HR | Mở chi tiết hồ sơ | Hiển thị đầy đủ thông tin intern |  |  |
| 12 | HR | Xem danh sách tài liệu | Thấy CV/đơn intern đã upload |  |  |

---

## 7. Flow test quyền

| Test ID | Người thực hiện | Hành động | Expected | Actual | Status |
|---|---|---|---|---|---|
| PER-001 | Chưa login | Truy cập màn intern profile | Bị chuyển về login hoặc 401 |  |  |
| PER-002 | Intern A | Truy cập hồ sơ của Intern B | Bị chặn 403 hoặc báo không có quyền |  |  |
| PER-003 | HR | Xem danh sách intern | Xem được danh sách |  |  |
| PER-004 | HR | Tạo hộ hồ sơ intern | Không cho tạo hộ trong Sprint 2 |  |  |
| PER-005 | Intern | Xem tài liệu của intern khác | Bị chặn 403 hoặc báo không có quyền |  |  |

---

## 8. Flow test validate

| Test ID | Module | Hành động | Expected | Actual | Status |
|---|---|---|---|---|---|
| VAL-001 | Intern Profile | Bỏ trống fullName | Báo lỗi required |  |  |
| VAL-002 | Intern Profile | Nhập email sai format | Báo lỗi email |  |  |
| VAL-003 | Intern Profile | Bỏ trống phone | Báo lỗi required |  |  |
| VAL-004 | Intern Profile | Nhập phone có chữ | Báo lỗi phone không hợp lệ |  |  |
| VAL-005 | Intern Profile | Nhập GPA = 4.5 | Báo lỗi GPA 0.0–4.0 |  |  |
| VAL-006 | Document | Upload file .exe | Báo lỗi định dạng file |  |  |
| VAL-007 | Document | Upload file >5MB | Báo lỗi dung lượng |  |  |

---

## 9. Kết quả test tổng hợp

| Nhóm test | Tổng số case | Pass | Fail | Blocked | Ghi chú |
|---|---:|---:|---:|---:|---|
| Intern Profile |  |  |  |  |  |
| Document Upload |  |  |  |  |  |
| Permission |  |  |  |  |  |
| Integration Flow |  |  |  |  |  |

---

## 10. Bug report template

| Bug ID | Module | Title | Steps | Expected | Actual | Severity | Status |
|---|---|---|---|---|---|---|---|
| BUG-S2-001 | Intern Profile |  |  |  |  |  | Open |
| BUG-S2-002 | Document |  |  |  |  |  | Open |

---

## 11. Notes khi test

Khi phát hiện lỗi, cần ghi rõ:

```text
1. Tài khoản đang dùng.
2. Role đang login.
3. URL đang test.
4. Request API nếu có.
5. Response status code.
6. Message lỗi trên FE.
7. Log backend nếu có.
8. Ảnh chụp màn hình nếu cần.
```

---

## 12. Checklist trước khi kết thúc Sprint 2

```text
[ ] Intern tạo hồ sơ thành công.
[ ] Intern sửa hồ sơ thành công.
[ ] Intern upload CV thành công.
[ ] Intern upload đơn xin thực tập thành công.
[ ] Intern nộp hồ sơ thành công.
[ ] HR xem được danh sách hồ sơ.
[ ] HR filter theo trường/ngành/trạng thái.
[ ] HR xem chi tiết hồ sơ.
[ ] HR xem tài liệu của intern.
[ ] Validate required hoạt động.
[ ] Validate phone hoạt động.
[ ] Validate GPA hoạt động.
[ ] Validate file type hoạt động.
[ ] Validate file size hoạt động.
[ ] Permission Intern/HR hoạt động đúng.
[ ] Bug được ghi lại nếu có.
```

---

## 13. Kết luận sau khi test

Điền sau khi test xong:

```text
Kết luận:
- Flow Intern nộp hồ sơ → HR xem hồ sơ: Pass/Fail
- Document Upload: Pass/Fail
- Permission: Pass/Fail
- Các bug còn tồn tại:
- Đề xuất xử lý:
```