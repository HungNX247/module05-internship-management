# Sprint 2 — UI Bug List (Cao Đức Duy — HR Intern)

| Bug ID | Module | Title | Steps | Expected | Actual | Severity | Status |
|--------|--------|-------|-------|----------|--------|----------|--------|
| BUG-S2-UI-001 | HR Intern List | | | | | Medium | Open |
| BUG-S2-UI-002 | HR Intern Detail | | | | | Medium | Open |

## Test cases (T-062)

| Test ID | Nội dung | Expected | Pass? |
|---------|----------|----------|-------|
| UI-001 | HR login → `/hr/interns` | Màn danh sách hiển thị, không 404 | |
| UI-002 | Load danh sách | Bảng hoặc empty state | |
| UI-003 | Filter school | Query `school` đúng | |
| UI-004 | Filter major | Query `major` đúng | |
| UI-005 | Filter status | Query `status` đúng | |
| UI-006 | Reset filter | Filter rỗng, load page 0 | |
| UI-007 | Xem chi tiết | Navigate `/hr/interns/{id}` | |
| UI-008 | Chi tiết intern | Đủ thông tin hồ sơ | |
| UI-009 | Danh sách tài liệu | Documents hoặc empty state | |
| UI-010 | Không có data | Empty state, layout OK | |
| UI-011 | API 401/403/500 | Message lỗi rõ | |
| UI-012 | Responsive | Layout không vỡ nặng | |

## Ghi chú khi test

- Role login: HR
- Mock UI (BE chưa sẵn): `VITE_HR_INTERN_MOCK=true` trong `frontend/.env.local`
- Ghi kèm URL, screenshot, request Network nếu lỗi API
