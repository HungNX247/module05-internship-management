# Database Design Note

## 1. Quy ước chung
- Tên bảng dùng snake_case, số nhiều.
- Primary key dùng id BIGINT AUTO_INCREMENT.
- Thời gian tạo/cập nhật dùng created_at, updated_at.
- Trạng thái dùng VARCHAR để dễ đọc trong giai đoạn đầu dự án.

## 2. Ghi chú thiết kế
- users là bảng tài khoản đăng nhập.
- roles quản lý vai trò người dùng.
- interns là hồ sơ thực tập sinh.
- mentors liên kết với users thông qua user_id.
- departments dùng cho mentor và program.
- program_interns dùng để gán intern vào chương trình.

## 3. Lưu ý
Thiết kế này là bản Sprint 0, có thể mở rộng thêm các bảng:
documents, contracts, tasks, weekly_reports, evaluations, attendance, leave_requests.
