# Sprint 2 - Testcase Document Upload/Review

## 1. Mục tiêu

Tài liệu này mô tả testcase cho phần upload và xem tài liệu của hồ sơ thực tập sinh trong Sprint 2.

Phạm vi test gồm:

- Upload CV.
- Upload đơn xin thực tập.
- Validate loại file.
- Validate dung lượng file.
- Xem danh sách tài liệu.
- HR xem tài liệu trong chi tiết hồ sơ.
- Phân quyền tài liệu.

---

## 2. Rule nghiệp vụ đã chốt

```text
1. Sprint 2 chỉ cho phép upload file PDF, DOC, DOCX.
2. Chưa hỗ trợ upload ảnh trong Sprint 2.
3. Dung lượng file tối đa là 5MB/file.
4. Intern upload tài liệu cho hồ sơ của chính mình.
5. HR xem được tài liệu trong chi tiết hồ sơ intern.
6. Intern không được xem tài liệu của intern khác.
```

---

## 3. Loại file hợp lệ và không hợp lệ

### 3.1. File hợp lệ

```text
.pdf
.doc
.docx
```

Ví dụ:

```text
cv.pdf
cv.doc
cv.docx
don-xin-thuc-tap.pdf
```

### 3.2. File không hợp lệ

```text
.exe
.zip
.rar
.js
.png
.jpg
.jpeg
```

Expected khi sai định dạng:

```text
Hiển thị lỗi: Chỉ cho phép upload file PDF, DOC, DOCX.
```

---

## 4. Dung lượng file

Dung lượng tối đa:

```text
5MB/file
```

Expected khi file quá dung lượng:

```text
Không upload file.
Hiển thị lỗi: File vượt quá dung lượng cho phép.
```

---

## 5. Test data đề xuất

| Loại test | File |
|---|---|
| File PDF hợp lệ | cv.pdf < 5MB |
| File DOC hợp lệ | cv.doc < 5MB |
| File DOCX hợp lệ | cv.docx < 5MB |
| File sai định dạng | file.exe |
| File ảnh chưa hỗ trợ | image.png |
| File quá dung lượng | large-cv.pdf > 5MB |

---

## 6. Testcase chi tiết

| Testcase ID | Module | Title | Pre-condition | Steps | Test data | Expected result | Priority |
|---|---|---|---|---|---|---|---|
| TC-DOC-001 | Document | Upload CV PDF hợp lệ | Intern đã đăng nhập, đã có hồ sơ | 1. Chọn file CV PDF 2. Bấm Upload | cv.pdf < 5MB | Upload thành công, file hiển thị trong danh sách tài liệu | High |
| TC-DOC-002 | Document | Upload CV DOC hợp lệ | Intern đã đăng nhập, đã có hồ sơ | 1. Chọn file DOC 2. Bấm Upload | cv.doc < 5MB | Upload thành công | Medium |
| TC-DOC-003 | Document | Upload CV DOCX hợp lệ | Intern đã đăng nhập, đã có hồ sơ | 1. Chọn file DOCX 2. Bấm Upload | cv.docx < 5MB | Upload thành công | Medium |
| TC-DOC-004 | Document | Upload đơn xin thực tập PDF hợp lệ | Intern đã đăng nhập, đã có hồ sơ | 1. Chọn file đơn PDF 2. Bấm Upload | application.pdf < 5MB | Upload thành công | Medium |
| TC-DOC-005 | Document | Upload file sai định dạng EXE | Intern đã đăng nhập | 1. Chọn file .exe 2. Bấm Upload | file.exe | Hệ thống từ chối, hiển thị lỗi định dạng file | High |
| TC-DOC-006 | Document | Upload file ảnh PNG | Intern đã đăng nhập | 1. Chọn file .png 2. Bấm Upload | image.png | Hệ thống từ chối vì Sprint 2 chưa hỗ trợ ảnh | Medium |
| TC-DOC-007 | Document | Upload file JPG | Intern đã đăng nhập | 1. Chọn file .jpg 2. Bấm Upload | image.jpg | Hệ thống từ chối vì Sprint 2 chưa hỗ trợ ảnh | Medium |
| TC-DOC-008 | Document | Upload file ZIP | Intern đã đăng nhập | 1. Chọn file .zip 2. Bấm Upload | cv.zip | Hệ thống từ chối, hiển thị lỗi định dạng file | Medium |
| TC-DOC-009 | Document | Upload file quá 5MB | Intern đã đăng nhập | 1. Chọn file >5MB 2. Bấm Upload | cv.pdf > 5MB | Hệ thống từ chối, hiển thị lỗi dung lượng | High |
| TC-DOC-010 | Document | Upload khi chưa chọn file | Intern đã đăng nhập | 1. Không chọn file 2. Bấm Upload | Không có file | Hiển thị lỗi vui lòng chọn file | Medium |
| TC-DOC-011 | Document | Xem danh sách tài liệu của intern | Intern đã upload file | 1. Mở profile 2. Xem tài liệu | internProfileId hợp lệ | Hiển thị danh sách file đã upload | High |
| TC-DOC-012 | Document | HR xem tài liệu trong chi tiết hồ sơ | HR đã đăng nhập, hồ sơ có file | 1. Mở danh sách intern 2. Mở chi tiết hồ sơ | Hồ sơ có file | HR xem được danh sách tài liệu | High |
| TC-DOC-013 | Permission | Intern không xem tài liệu của intern khác | Intern đã đăng nhập | 1. Truy cập document của người khác | documentId khác | Bị chặn 403 hoặc báo không có quyền | High |
| TC-DOC-014 | Permission | User chưa login upload tài liệu | Chưa đăng nhập | 1. Gọi API upload hoặc mở màn upload | Không token | Bị chặn 401 hoặc chuyển về login | High |
| TC-DOC-015 | Document | Upload lỗi server | Backend trả 500 | 1. Upload file hợp lệ | cv.pdf | UI hiển thị lỗi rõ ràng, không treo màn hình | Medium |
| TC-DOC-016 | Document | Upload nhiều file lần lượt | Intern đã đăng nhập | 1. Upload CV 2. Upload đơn xin thực tập | cv.pdf, application.docx | Cả hai file hiển thị trong danh sách tài liệu | Medium |

---

## 7. Checklist test Document Upload

```text
[ ] Upload PDF hợp lệ.
[ ] Upload DOC hợp lệ.
[ ] Upload DOCX hợp lệ.
[ ] Từ chối file EXE.
[ ] Từ chối file ZIP/RAR.
[ ] Từ chối ảnh PNG/JPG trong Sprint 2.
[ ] Từ chối file quá 5MB.
[ ] Hiển thị lỗi khi chưa chọn file.
[ ] Intern xem được tài liệu của mình.
[ ] HR xem được tài liệu trong chi tiết hồ sơ.
[ ] Intern không xem tài liệu của intern khác.
[ ] User chưa login bị chặn.
[ ] Upload lỗi server có message rõ ràng.
```

---

## 8. Ghi chú cho BE

Backend cần đảm bảo:

```text
1. Validate extension file.
2. Validate dung lượng file <= 5MB.
3. Lưu file đúng thư mục cấu hình.
4. Không cho upload nếu user không có quyền.
5. Response trả đủ thông tin file để FE hiển thị.
```

Response gợi ý:

```json
{
  "success": true,
  "message": "Upload document successfully",
  "data": {
    "id": 1,
    "internProfileId": 10,
    "fileName": "cv.pdf",
    "fileType": "PDF",
    "fileSize": 102400,
    "uploadedAt": "2026-05-18T10:00:00"
  }
}
```

---

## 9. Ghi chú cho FE

Frontend cần đảm bảo:

```text
1. Hiển thị trạng thái đang upload.
2. Hiển thị message upload thành công.
3. Hiển thị message lỗi rõ ràng.
4. Không để màn hình treo khi API lỗi.
5. Không chỉ console.log lỗi.
```

---

## 10. Acceptance Criteria

```text
[ ] Có testcase upload PDF/DOC/DOCX hợp lệ.
[ ] Có testcase file sai định dạng.
[ ] Có testcase file quá 5MB.
[ ] Có testcase HR xem tài liệu.
[ ] Có testcase phân quyền tài liệu.
[ ] Có testcase lỗi server/upload fail.
```