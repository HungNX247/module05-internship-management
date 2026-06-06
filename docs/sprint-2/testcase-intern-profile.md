# Sprint 2 - Testcase Intern Profile

## 1. Mục tiêu

Tài liệu này mô tả testcase cho module **Intern Profile** trong Sprint 2.

Phạm vi test gồm:

- Tạo hồ sơ intern.
- Sửa hồ sơ intern.
- Nộp hồ sơ.
- Xem chi tiết hồ sơ.
- Tìm kiếm hồ sơ.
- Lọc hồ sơ.
- Validate dữ liệu.
- Phân quyền intern/HR.

---

## 2. Rule nghiệp vụ liên quan

Các testcase trong tài liệu này dựa trên rule đã chốt:

```text
1. GPA dùng thang 4.0.
2. GPA không bắt buộc.
3. Nếu nhập GPA thì phải từ 0.0 đến 4.0.
4. Phone bắt buộc, chỉ chứa số, độ dài 10 chữ số.
5. InternProfile gắn trực tiếp với User.
6. Một user role INTERN có tối đa một hồ sơ intern.
7. Intern chỉ được xem/sửa/nộp hồ sơ của chính mình.
8. HR xem được danh sách và chi tiết hồ sơ intern.
9. HR chưa tạo hộ hồ sơ trong Sprint 2.
```

---

## 3. Test data đề xuất

### 3.1. Tài khoản test

| Role | Email | Password |
|---|---|---|
| INTERN | intern@gmail.com | 123456 |
| HR | hr@gmail.com | 123456 |
| ADMIN | admin@gmail.com | 123456 |

### 3.2. Dữ liệu hồ sơ hợp lệ

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

## 4. Testcase chi tiết

| Testcase ID | Module | Title | Pre-condition | Steps | Test data | Expected result | Priority |
|---|---|---|---|---|---|---|---|
| TC-IP-001 | Intern Profile | Intern tạo hồ sơ hợp lệ | Intern đã đăng nhập, chưa có hồ sơ | 1. Mở màn hình nộp hồ sơ 2. Nhập đủ thông tin hợp lệ 3. Bấm Lưu | Dữ liệu hồ sơ hợp lệ | Hồ sơ được tạo thành công, status = Draft | High |
| TC-IP-002 | Intern Profile | Tạo hồ sơ thiếu họ tên | Intern đã đăng nhập | 1. Bỏ trống họ tên 2. Nhập các field còn lại 3. Submit | fullName rỗng | Hiển thị lỗi bắt buộc nhập họ tên | High |
| TC-IP-003 | Intern Profile | Tạo hồ sơ thiếu email | Intern đã đăng nhập | 1. Bỏ trống email 2. Submit | email rỗng | Hiển thị lỗi bắt buộc nhập email | High |
| TC-IP-004 | Intern Profile | Tạo hồ sơ email sai format | Intern đã đăng nhập | 1. Nhập email sai format 2. Submit | email = abc | Hiển thị lỗi email không đúng định dạng | High |
| TC-IP-005 | Intern Profile | Tạo hồ sơ thiếu phone | Intern đã đăng nhập | 1. Bỏ trống phone 2. Submit | phone rỗng | Hiển thị lỗi bắt buộc nhập số điện thoại | High |
| TC-IP-006 | Intern Profile | Tạo hồ sơ phone chứa chữ | Intern đã đăng nhập | 1. Nhập phone có chữ 2. Submit | phone = 09123abc | Hiển thị lỗi số điện thoại không hợp lệ | High |
| TC-IP-007 | Intern Profile | Tạo hồ sơ phone ít hơn 10 số | Intern đã đăng nhập | 1. Nhập phone ít hơn 10 số 2. Submit | phone = 09123 | Hiển thị lỗi số điện thoại không hợp lệ | High |
| TC-IP-008 | Intern Profile | Tạo hồ sơ phone nhiều hơn 10 số | Intern đã đăng nhập | 1. Nhập phone nhiều hơn 10 số 2. Submit | phone = 091234567890 | Hiển thị lỗi số điện thoại không hợp lệ | High |
| TC-IP-009 | Intern Profile | Tạo hồ sơ thiếu trường | Intern đã đăng nhập | 1. Bỏ trống school 2. Submit | school rỗng | Hiển thị lỗi bắt buộc nhập trường | High |
| TC-IP-010 | Intern Profile | Tạo hồ sơ thiếu ngành | Intern đã đăng nhập | 1. Bỏ trống major 2. Submit | major rỗng | Hiển thị lỗi bắt buộc nhập ngành học | High |
| TC-IP-011 | Intern Profile | Tạo hồ sơ thiếu năm học | Intern đã đăng nhập | 1. Bỏ trống academicYear 2. Submit | academicYear rỗng | Hiển thị lỗi bắt buộc nhập năm học | Medium |
| TC-IP-012 | Intern Profile | GPA hợp lệ | Intern đã đăng nhập | 1. Nhập GPA trong khoảng 0.0–4.0 2. Submit | GPA = 3.2 | Hồ sơ được lưu thành công | Medium |
| TC-IP-013 | Intern Profile | GPA bằng 0 | Intern đã đăng nhập | 1. Nhập GPA = 0 2. Submit | GPA = 0 | Hồ sơ được lưu thành công | Medium |
| TC-IP-014 | Intern Profile | GPA bằng 4.0 | Intern đã đăng nhập | 1. Nhập GPA = 4.0 2. Submit | GPA = 4.0 | Hồ sơ được lưu thành công | Medium |
| TC-IP-015 | Intern Profile | GPA nhỏ hơn 0 | Intern đã đăng nhập | 1. Nhập GPA âm 2. Submit | GPA = -1 | Hiển thị lỗi GPA phải từ 0.0 đến 4.0 | Medium |
| TC-IP-016 | Intern Profile | GPA lớn hơn 4.0 | Intern đã đăng nhập | 1. Nhập GPA > 4.0 2. Submit | GPA = 4.5 | Hiển thị lỗi GPA phải từ 0.0 đến 4.0 | Medium |
| TC-IP-017 | Intern Profile | GPA không bắt buộc | Intern đã đăng nhập | 1. Để trống GPA 2. Nhập đủ field bắt buộc 3. Submit | GPA rỗng | Hồ sơ vẫn được tạo thành công | Medium |
| TC-IP-018 | Intern Profile | Sửa hồ sơ hợp lệ | Intern đã có hồ sơ Draft | 1. Mở profile 2. Sửa phone/school/major 3. Lưu | phone mới | Cập nhật thành công | High |
| TC-IP-019 | Intern Profile | Intern nộp hồ sơ | Intern đã có hồ sơ Draft | 1. Mở hồ sơ 2. Bấm Nộp hồ sơ | Hồ sơ hợp lệ | Status chuyển Submitted | High |
| TC-IP-020 | Intern Profile | HR xem danh sách hồ sơ | HR đã đăng nhập | 1. Vào màn danh sách intern | Có dữ liệu hồ sơ | HR xem được danh sách hồ sơ intern | High |
| TC-IP-021 | Intern Profile | HR xem chi tiết hồ sơ | HR đã đăng nhập, có hồ sơ intern | 1. Click xem chi tiết | internProfileId hợp lệ | Hiển thị đầy đủ thông tin hồ sơ | High |
| TC-IP-022 | Intern Profile | HR tìm kiếm theo tên | HR đã đăng nhập | 1. Nhập keyword 2. Search | keyword = Nguyen | Danh sách hiển thị hồ sơ phù hợp | Medium |
| TC-IP-023 | Intern Profile | HR lọc theo trường | HR đã đăng nhập | 1. Chọn trường 2. Filter | school = Đại học A | Danh sách lọc đúng theo trường | Medium |
| TC-IP-024 | Intern Profile | HR lọc theo ngành | HR đã đăng nhập | 1. Chọn ngành 2. Filter | major = CNTT | Danh sách lọc đúng theo ngành | Medium |
| TC-IP-025 | Intern Profile | HR lọc theo trạng thái | HR đã đăng nhập | 1. Chọn status 2. Filter | status = Submitted | Danh sách chỉ hiển thị hồ sơ Submitted | High |
| TC-IP-026 | Permission | Intern không xem hồ sơ người khác | Intern đã đăng nhập | 1. Truy cập URL hồ sơ intern khác | id hồ sơ khác | Bị chặn 403 hoặc báo không có quyền | High |
| TC-IP-027 | Permission | User chưa login truy cập hồ sơ | Chưa đăng nhập | 1. Mở URL profile | Không token | Bị chuyển về login hoặc trả 401 | High |
| TC-IP-028 | Permission | HR không tạo hộ hồ sơ intern | HR đã đăng nhập | 1. Gọi API tạo hồ sơ thay intern hoặc mở màn tạo hộ nếu có | HR token | Không cho tạo hộ trong Sprint 2 | Medium |

---

## 5. Checklist test Intern Profile

```text
[ ] Tạo hồ sơ hợp lệ.
[ ] Validate required field.
[ ] Validate email format.
[ ] Validate phone 10 chữ số.
[ ] Validate GPA từ 0.0 đến 4.0.
[ ] GPA có thể bỏ trống.
[ ] Sửa hồ sơ Draft.
[ ] Nộp hồ sơ chuyển Submitted.
[ ] HR xem danh sách hồ sơ.
[ ] HR xem chi tiết hồ sơ.
[ ] HR tìm kiếm/lọc hồ sơ.
[ ] Intern không xem/sửa hồ sơ người khác.
[ ] User chưa login bị chặn.
```

---

## 6. Ghi chú QA

- Nếu backend trả lỗi validation, frontend cần hiển thị message rõ ràng.
- Không được chỉ `console.log` lỗi.
- Không được để màn hình trắng khi API lỗi.
- Nếu có bug, ghi vào bug list Sprint 2.