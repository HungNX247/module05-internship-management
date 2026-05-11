# ERD - Internship Management System

## 1. Mục tiêu
Tài liệu này mô tả ERD sơ bộ cho hệ thống quản lý thực tập sinh.

## 2. Các bảng chính
- roles
- users
- departments
- mentors
- interns
- programs
- program_interns

## 3. Quan hệ chính

| Quan hệ | Mô tả |
|---|---|
| roles 1 - n users | Một role có nhiều user |
| users 1 - 1 mentors | Một user có thể là một mentor |
| users 1 - 1 interns | Một user có thể là một intern |
| departments 1 - n mentors | Một phòng ban có nhiều mentor |
| departments 1 - n programs | Một phòng ban có nhiều chương trình |
| mentors 1 - n interns | Một mentor quản lý nhiều intern |
| programs n - n interns | Gán qua bảng program_interns |

## 4. Ghi chú
- users dùng cho đăng nhập.
- interns dùng cho hồ sơ thực tập sinh.
- mentors dùng cho thông tin mentor.
- roles dùng cho phân quyền.
- programs dùng cho chương trình thực tập.
