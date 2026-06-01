# Sprint 2 - Intern Profile Field Spec

## 1. Mục tiêu

Tài liệu này dùng để chốt các field của hồ sơ thực tập sinh trong Sprint 2.

Tài liệu này là căn cứ để:

- Backend tạo entity, DTO, API.
- Frontend làm form nhập hồ sơ.
- QA viết testcase.
- Team thống nhất nghiệp vụ, tránh mỗi người hiểu một kiểu.

---

## 2. Phạm vi Sprint 2

Sprint 2 tập trung vào flow:

```text
Intern đăng nhập
→ Tạo/cập nhật hồ sơ thực tập sinh
→ Upload CV/đơn xin thực tập
→ Nộp hồ sơ
→ HR xem danh sách hồ sơ
→ HR xem chi tiết hồ sơ và tài liệu
```

Trong Sprint 2:

- Intern tự tạo/sửa/nộp hồ sơ của chính mình.
- HR chỉ xem danh sách và chi tiết hồ sơ.
- HR chưa tạo hộ hồ sơ cho intern.
- Mỗi user role INTERN có tối đa một hồ sơ intern.

---

## 3. Rule nghiệp vụ đã chốt

### 3.1. GPA

- GPA dùng thang 4.0.
- GPA không bắt buộc.
- Nếu nhập thì phải nằm trong khoảng 0.0 đến 4.0.

Ví dụ hợp lệ:

```text
2.5
3.0
3.2
3.75
4.0
```

Ví dụ không hợp lệ:

```text
-1
4.5
10
abc
```

Expected khi nhập sai:

```text
Hiển thị lỗi: GPA phải nằm trong khoảng 0.0 đến 4.0.
```

---

### 3.2. Phone

- Phone là bắt buộc.
- Phone chỉ cho nhập số.
- Phone có độ dài 10 chữ số.

Ví dụ hợp lệ:

```text
0912345678
0987654321
```

Ví dụ không hợp lệ:

```text
abc123
09123
091234567890
0912abc678
```

Expected khi nhập sai:

```text
Hiển thị lỗi: Số điện thoại không hợp lệ.
```

---

### 3.3. Quan hệ InternProfile với User

- `InternProfile` gắn trực tiếp với `User`.
- Một `User` role `INTERN` có tối đa một `InternProfile`.
- Intern chỉ được xem/sửa/nộp hồ sơ của chính mình.
- HR được xem danh sách và chi tiết hồ sơ intern.

---

## 4. Danh sách field hồ sơ intern

| Field | Tên hiển thị | Kiểu dữ liệu | Bắt buộc | Validate | Ghi chú |
|---|---|---|---|---|---|
| id | ID hồ sơ | Long | Tự sinh | Không nhập tay | Khóa chính |
| userId | User ID | Long | Có | Phải là user role INTERN | Gắn InternProfile với User |
| fullName | Họ tên | String | Có | Không rỗng, tối đa 100 ký tự | Họ tên thực tập sinh |
| email | Email | String | Có | Đúng định dạng email | Email liên hệ |
| phone | Số điện thoại | String | Có | 10 chữ số, chỉ chứa số | SĐT liên hệ |
| school | Trường | String | Có | Không rỗng, tối đa 150 ký tự | Trường đại học/cao đẳng |
| major | Ngành học | String | Có | Không rỗng, tối đa 150 ký tự | Ví dụ: CNTT, KTPM |
| academicYear | Năm học | String | Có | Không rỗng | Ví dụ: Năm 3, Năm 4 |
| gpa | GPA | Decimal | Không | Nếu nhập: 0.0–4.0 | GPA thang 4 |
| status | Trạng thái hồ sơ | Enum | Có | Draft/Pending/Submitted | Trạng thái xử lý hồ sơ |
| createdAt | Ngày tạo | DateTime | Tự sinh | Không nhập tay | Audit |
| updatedAt | Ngày cập nhật | DateTime | Tự sinh | Không nhập tay | Audit |

---

## 5. Gợi ý request tạo hồ sơ

```json
{
  "fullName": "Nguyễn Văn A",
  "email": "intern1@gmail.com",
  "phone": "0912345678",
  "school": "Đại học Công nghiệp Hà Nội",
  "major": "Công nghệ thông tin",
  "academicYear": "Năm 4",
  "gpa": 3.2
}
```

Lưu ý:

- Frontend không nên truyền `userId` trực tiếp nếu API là intern tự tạo hồ sơ.
- Backend nên lấy user hiện tại từ token.
- Khi tạo hồ sơ lần đầu, status mặc định nên là `Draft`.

---

## 6. Gợi ý response hồ sơ intern

```json
{
  "success": true,
  "message": "Get intern profile successfully",
  "data": {
    "id": 1,
    "userId": 10,
    "fullName": "Nguyễn Văn A",
    "email": "intern1@gmail.com",
    "phone": "0912345678",
    "school": "Đại học Công nghiệp Hà Nội",
    "major": "Công nghệ thông tin",
    "academicYear": "Năm 4",
    "gpa": 3.2,
    "status": "Draft",
    "createdAt": "2026-05-18T10:00:00",
    "updatedAt": "2026-05-18T10:00:00"
  }
}
```

---

## 7. Quy tắc phân quyền

| Role | Quyền |
|---|---|
| INTERN | Tạo/sửa/nộp hồ sơ của chính mình |
| HR | Xem danh sách và chi tiết hồ sơ intern |
| ADMIN | Có thể xem/quản trị nếu team mở rộng sau |
| MENTOR | Chưa xử lý trong Sprint 2 nếu chưa có nghiệp vụ |

---

## 8. Acceptance Criteria

```text
[ ] Có danh sách field hồ sơ intern.
[ ] Có mô tả field bắt buộc/không bắt buộc.
[ ] Có rule validate cho email, phone, GPA.
[ ] Có mô tả InternProfile gắn với User.
[ ] Có mô tả quyền INTERN/HR.
[ ] BE/FE/QA thống nhất dùng chung field.
```

---

## 9. Ghi chú cho team

- Long dùng tài liệu này để tạo entity `InternProfile` và API create/update/detail.
- Quốc Anh dùng tài liệu này để làm search/filter và document liên quan intern.
- Nguyệt dùng tài liệu này để làm form intern nộp hồ sơ.
- Duy dùng tài liệu này để làm màn HR xem danh sách và chi tiết hồ sơ.
- Hùng dùng tài liệu này để viết testcase và test tích hợp.