# Sprint 2 — UI Bug List (Cao Đức Duy — HR Intern)

| Bug ID | Module | Title | Steps | Expected | Actual | Severity | Status |
|--------|--------|-------|-------|----------|--------|----------|--------|
| BUG-S2-UI-001 | HR Intern List | | | | | Medium | Open |
| BUG-S2-UI-002 | HR Intern Detail | | | | | Medium | Open |

## Test cases (T-062)

| Test ID | Nội dung | Expected | Pass? |
|---------|----------|----------|-------|
| UI-001 | HR login → `/hr/interns` | Màn danh sách hiển thị, không 404 | Pass |
| UI-002 | Load danh sách | Bảng hoặc empty state | Pass (3 mock rows) |
| UI-003 | Filter school | Query `school` đúng | Pass ("Công nghiệp" → 2 rows) |
| UI-004 | Filter major | Query `major` đúng | Pass ("phần mềm" → 1 row) |
| UI-005 | Filter status | Query `status` đúng | Pass (DRAFT → 1 row) |
| UI-006 | Reset filter | Filter rỗng, load page 0 | Pass (3 rows, fields cleared) |
| UI-007 | Xem chi tiết | Navigate `/hr/interns/{id}` | Pass |
| UI-008 | Chi tiết intern | Đủ thông tin hồ sơ | Pass |
| UI-009 | Danh sách tài liệu | Documents hoặc empty state | Pass (intern #1: 2 files) |
| UI-010 | Không có data | Empty state, layout OK | Pass ("Trường không tồn tại XYZ" → empty, no pagination) |
| UI-011 | API 401/403/500 | Message lỗi rõ | Pass (403 mock: "Forbidden — không có quyền HR") |
| UI-012 | Responsive | Layout không vỡ nặng | Pass (390px: filter stack dọc, layout ổn) |

## Ghi chú khi test

- Role login: HR (mock: `VITE_HR_INTERN_MOCK=true`)
- Test lỗi API (UI-011): `VITE_HR_INTERN_MOCK_ERROR=401|403|500` trong `.env.local`, restart `npm run dev`
- Ghi kèm URL, screenshot, request Network nếu lỗi API thật (khi tắt mock)

## Cải tiến code (test round 2)

- `getApiErrorMessage()` — message theo 401/403/500
- `throwMockApiErrorIfConfigured()` — test lỗi không cần backend
- Ẩn pagination khi danh sách rỗng
- CSS responsive 768px: filter dọc, table scroll ngang
