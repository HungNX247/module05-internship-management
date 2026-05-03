# Sprint 0 - Planning & Setup

## 1. Mục tiêu Sprint 0

Sprint 0 dùng để chuẩn bị nền tảng cho dự án trước khi bước vào Sprint 1.

Mục tiêu chính:
- Đọc và phân tích Product Backlog
- Gom nhóm Epic / Feature / User Story
- Chốt phạm vi MVP
- Chốt actor và vai trò người dùng
- Chốt phân công thành viên
- Chuẩn bị Git workflow
- Chuẩn bị Sprint 1

---

## 2. Tên dự án

Internship Management System

## 3. Mục tiêu dự án

Xây dựng hệ thống quản lý thực tập sinh cho doanh nghiệp, hỗ trợ HR, Mentor, Intern và Admin trong quá trình tiếp nhận, quản lý, giao việc, báo cáo và đánh giá thực tập sinh.

---

## 4. Actor chính

| Actor | Mô tả |
|---|---|
| Admin | Quản lý tài khoản, phân quyền, nhật ký hệ thống |
| HR | Quản lý hồ sơ, xét duyệt, mentor, chương trình thực tập |
| Mentor | Giao việc, xem báo cáo, phản hồi, đánh giá intern |
| Intern | Nộp hồ sơ, upload tài liệu, xem lịch, làm task, báo cáo |
| System | Gửi email, lưu log, backup |

---

## 5. Các module chính của hệ thống

| Module | Nội dung |
|---|---|
| Auth & User Management | Đăng nhập, phân quyền, quản lý tài khoản |
| Intern Profile | Hồ sơ thực tập sinh, upload CV, nộp hồ sơ |
| Application Review | HR duyệt hoặc từ chối hồ sơ |
| Contract | HR upload hợp đồng, intern xác nhận |
| Mentor Management | Quản lý mentor, gán mentor cho intern |
| Program Management | Quản lý chương trình thực tập, phòng ban, lịch thực tập |
| Task & Progress | Mentor giao việc, intern cập nhật tiến độ |
| Weekly Report | Intern nộp báo cáo tuần, mentor phản hồi |
| Evaluation | Mentor đánh giá, HR tổng hợp đánh giá |
| Attendance & Leave | Check-in/check-out, nghỉ phép |
| Allowance & Support | Phụ cấp, yêu cầu hỗ trợ |
| Dashboard & Report | Thống kê, xuất báo cáo |
| Audit & Deploy | Nhật ký hoạt động, backup, deploy |

---

## 6. MVP của dự án

MVP là bản tối thiểu nhưng có thể demo được luồng chính.

MVP bao gồm:

1. Đăng nhập và phân quyền
2. Admin quản lý tài khoản
3. HR quản lý hồ sơ thực tập sinh
4. Intern nộp hồ sơ và upload tài liệu
5. HR duyệt hoặc từ chối hồ sơ
6. HR quản lý mentor
7. HR tạo chương trình thực tập
8. HR gán intern cho mentor/chương trình
9. Mentor giao task cho intern
10. Intern cập nhật tiến độ/nộp báo cáo
11. Mentor phản hồi và đánh giá
12. HR xem tổng hợp đánh giá

Các chức năng để sau nếu còn thời gian:
- Chấm công
- Nghỉ phép
- Phụ cấp
- Hỗ trợ
- Chatbot
- Tích hợp HRM
- Tích hợp QR/thẻ chấm công

---

## 7. Phân vai nhóm

| Thành viên | Vai trò |
|---|---|
| Nguyễn Xuân Hùng | Nhóm trưởng / BA / QA / Scrum Master / Git Owner / Integration |
| Lê Hải Long | Backend Lead |
| Đinh Trần Quốc Anh | Backend Developer / Database / API Support |
| Huỳnh Thị Minh Nguyệt | Frontend Lead |
| Cao Đức Duy | Frontend Developer / UI Support |

---

## 8. Kế hoạch Sprint tổng quan

| Sprint | Mục tiêu |
|---|---|
| Sprint 0 | Setup dự án, phân tích backlog, Git workflow, chuẩn bị Sprint 1 |
| Sprint 1 | Auth, phân quyền, quản lý tài khoản |
| Sprint 2 | Hồ sơ intern, nộp hồ sơ, upload tài liệu |
| Sprint 3 | Duyệt hồ sơ, hợp đồng, mentor |
| Sprint 4 | Chương trình thực tập, phòng ban, lịch |
| Sprint 5 | Task, tiến độ, báo cáo tuần, đánh giá |
| Sprint 6 | Chấm công, nghỉ phép, phụ cấp, hỗ trợ |
| Sprint 7 | Dashboard, báo cáo, audit, deploy, demo |

---

## 9. Sprint 1 dự kiến

| Thành viên | Task | Branch |
|---|---|---|
| Lê Hải Long | Auth API, Security, Login, Logout, BCrypt | feature/auth-login-api |
| Đinh Trần Quốc Anh | User CRUD API, seed admin, khóa/mở tài khoản | feature/user-management-api |
| Huỳnh Thị Minh Nguyệt | Login UI, dashboard theo role | feature/auth-login-ui |
| Cao Đức Duy | User list, user form, menu theo role | feature/user-management-ui |
| Nguyễn Xuân Hùng | Acceptance Criteria, testcase, review PR, test flow | feature/auth-testcases |

---

## 10. Definition of Done chung

Một task được coi là Done khi:

1. Code/tài liệu đã hoàn thành đúng yêu cầu
2. Đã self-check
3. Đã commit/push lên branch riêng
4. Đã tạo Pull Request vào develop
5. Không có conflict
6. Đã được review
7. Đã merge vào develop