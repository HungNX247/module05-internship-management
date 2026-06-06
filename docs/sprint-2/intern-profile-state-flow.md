# Sprint 2 - Intern Profile State Flow

## 1. Mục tiêu

Tài liệu này mô tả các trạng thái ban đầu của hồ sơ thực tập sinh trong Sprint 2.

Mục tiêu là giúp Backend, Frontend và QA thống nhất:

- Hồ sơ có những trạng thái nào.
- Ai được thao tác trên từng trạng thái.
- Khi nào trạng thái thay đổi.
- Testcase cần kiểm tra những flow nào.

---

## 2. Danh sách trạng thái đã chốt

| Status | Ý nghĩa | Ai thao tác | Ghi chú |
|---|---|---|---|
| Draft | Hồ sơ đang nháp, intern chưa nộp | INTERN | Có thể sửa |
| Submitted | Intern đã bấm nộp hồ sơ | INTERN | Hồ sơ đã gửi lên hệ thống |
| Pending | Hồ sơ đang chờ HR xem/xử lý | HR/System | HR nhìn thấy trong danh sách chờ xử lý |

---

## 3. State flow tổng quát

```text
Draft → Submitted → Pending
```

Giải thích:

1. Intern tạo hồ sơ lần đầu, hồ sơ ở trạng thái `Draft`.
2. Intern kiểm tra thông tin và bấm nộp hồ sơ, hồ sơ chuyển sang `Submitted`.
3. HR xem/tiếp nhận hồ sơ, hồ sơ có thể chuyển sang `Pending`.

---

## 4. Flow chi tiết

### 4.1. Intern tạo hồ sơ

```text
Intern đăng nhập
→ Mở màn hình nộp hồ sơ
→ Nhập thông tin
→ Bấm lưu
→ Hồ sơ được tạo với status = Draft
```

Expected:

```text
Hệ thống tạo hồ sơ thành công.
Intern có thể tiếp tục chỉnh sửa hồ sơ.
```

---

### 4.2. Intern sửa hồ sơ Draft

```text
Intern đăng nhập
→ Mở hồ sơ của mình
→ Sửa thông tin
→ Bấm lưu
→ Hồ sơ vẫn ở status = Draft
```

Expected:

```text
Thông tin hồ sơ được cập nhật.
Status không thay đổi.
```

---

### 4.3. Intern nộp hồ sơ

```text
Intern đăng nhập
→ Mở hồ sơ Draft
→ Kiểm tra thông tin
→ Bấm Nộp hồ sơ
→ Status chuyển từ Draft sang Submitted
```

Expected:

```text
Hồ sơ chuyển sang Submitted.
HR có thể xem hồ sơ trong danh sách.
```

---

### 4.4. HR xem hồ sơ

```text
HR đăng nhập
→ Mở danh sách intern
→ Xem các hồ sơ Submitted/Pending
→ Mở chi tiết hồ sơ
```

Expected:

```text
HR xem được thông tin hồ sơ và tài liệu đính kèm.
```

---

## 5. Rule nghiệp vụ trạng thái

```text
1. Hồ sơ mới tạo mặc định là Draft.
2. Intern được sửa hồ sơ khi status = Draft.
3. Khi Intern bấm Submit, hồ sơ chuyển sang Submitted.
4. HR xem được hồ sơ Submitted/Pending.
5. Intern không được sửa hồ sơ của người khác.
6. HR không tạo hộ hồ sơ trong Sprint 2.
7. Pending có thể dùng cho trạng thái chờ HR xử lý hoặc tiếp nhận.
```

---

## 6. Ghi chú về Submitted và Pending

Trong Sprint 2, để tránh phình scope, có thể xử lý đơn giản:

```text
Intern nộp hồ sơ xong → Submitted.
HR list có thể xem hồ sơ Submitted.
Pending giữ lại để phục vụ flow xử lý ở sprint sau nếu cần.
```

Nếu team muốn dùng luôn `Pending` trong Sprint 2:

```text
Intern nộp hồ sơ → Submitted.
Khi HR mở/xác nhận tiếp nhận → Pending.
```

---

## 7. Quyền theo trạng thái

| Role | Draft | Submitted | Pending |
|---|---|---|---|
| INTERN | Tạo/sửa hồ sơ của mình | Xem hồ sơ của mình | Xem hồ sơ của mình |
| HR | Không cần xem nếu chưa nộp | Xem danh sách/chi tiết | Xem danh sách/chi tiết |
| ADMIN | Có thể mở rộng sau | Có thể mở rộng sau | Có thể mở rộng sau |
| MENTOR | Chưa xử lý Sprint 2 | Chưa xử lý Sprint 2 | Chưa xử lý Sprint 2 |

---

## 8. Test flow cần kiểm tra

| Test ID | Flow | Expected |
|---|---|---|
| SF-001 | Tạo hồ sơ lần đầu | Status = Draft |
| SF-002 | Sửa hồ sơ Draft | Cập nhật thành công |
| SF-003 | Nộp hồ sơ Draft | Status = Submitted |
| SF-004 | HR xem hồ sơ Submitted | Xem được chi tiết |
| SF-005 | Intern xem hồ sơ người khác | Bị chặn |
| SF-006 | User chưa login xem hồ sơ | Bị chuyển login hoặc 401 |

---

## 9. Acceptance Criteria

```text
[ ] Có danh sách status Draft/Pending/Submitted.
[ ] Có mô tả ý nghĩa từng status.
[ ] Có mô tả flow Draft → Submitted → Pending.
[ ] Có rule ai được thao tác trên từng status.
[ ] Có test flow trạng thái.
[ ] Team thống nhất để BE/FE làm theo.
```