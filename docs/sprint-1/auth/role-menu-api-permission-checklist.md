# Sprint 1 - Role Menu & API Permission Checklist

## 1. Mục tiêu tài liệu

Tài liệu này dùng để review menu theo role và quyền truy cập API trong Sprint 1.

Người phụ trách: Nguyễn Xuân Hùng  
Vai trò: QA / Integration / Demo Owner

---

## 2. Nguyên tắc quan trọng

Phân quyền cần kiểm tra ở 2 lớp:

```text
1. Frontend menu visibility
2. Backend API permission
```

Ẩn menu trên frontend chỉ giúp trải nghiệm người dùng tốt hơn.  
Bảo mật thật vẫn phải nằm ở backend API.

Ví dụ:

- INTERN không nhìn thấy menu User Management là đúng.
- Nhưng nếu INTERN cố gọi API `/api/admin/users`, backend vẫn phải chặn.

---

## 3. Menu dự kiến theo role

| Role | Menu được thấy | Menu không nên thấy |
|---|---|---|
| ADMIN | Dashboard, User Management, Role/Permission, Departments, Programs, Interns, Mentors | Tùy scope |
| HR | Dashboard, Interns, Programs, Mentors, Applications/Approval | Role/Permission, System Settings |
| MENTOR | Dashboard, My Interns, Tasks, Reports, Evaluations | User Management, Role Management, Department Management |
| INTERN | Dashboard, My Profile, My Tasks, My Reports | User Management, Mentor Management, Program Management |

---

## 4. API permission checklist

| Role | API được gọi | API không được gọi |
|---|---|---|
| ADMIN | `/api/admin/**`, `/api/hr/**` | Theo rule đã thống nhất |
| HR | `/api/hr/**` | `/api/admin/**` |
| MENTOR | `/api/mentor/**` | `/api/admin/**`, `/api/hr/**` |
| INTERN | `/api/intern/**` | `/api/admin/**`, `/api/hr/**`, `/api/mentor/**` |

---

## 5. Checklist review menu

| Checklist ID | Nội dung kiểm tra | Expected result | Status | Note |
|---|---|---|---|---|
| MENU_001 | Login bằng ADMIN | Thấy đúng menu ADMIN | To Do |  |
| MENU_002 | Login bằng HR | Thấy đúng menu HR | To Do |  |
| MENU_003 | Login bằng MENTOR | Thấy đúng menu MENTOR | To Do |  |
| MENU_004 | Login bằng INTERN | Thấy đúng menu INTERN | To Do |  |
| MENU_005 | HR không thấy menu Role/Permission nếu không có quyền | Menu bị ẩn | To Do |  |
| MENU_006 | MENTOR không thấy User Management | Menu bị ẩn | To Do |  |
| MENU_007 | INTERN không thấy User/Mentor/Program Management | Menu bị ẩn | To Do |  |
| MENU_008 | Refresh trang sau login | Menu vẫn đúng theo role | To Do |  |
| MENU_009 | Logout rồi login role khác | Menu đổi đúng theo role mới | To Do |  |

---

## 6. Checklist review API permission

| Checklist ID | Nội dung kiểm tra | Expected result | Status | Note |
|---|---|---|---|---|
| API_PERM_001 | Không login gọi API private | Bị chặn | To Do |  |
| API_PERM_002 | ADMIN gọi admin API | Thành công | To Do |  |
| API_PERM_003 | HR gọi admin API | Bị chặn 403 | To Do |  |
| API_PERM_004 | MENTOR gọi admin API | Bị chặn 403 | To Do |  |
| API_PERM_005 | INTERN gọi admin API | Bị chặn 403 | To Do |  |
| API_PERM_006 | HR gọi HR API | Thành công | To Do |  |
| API_PERM_007 | MENTOR gọi HR API | Bị chặn 403 | To Do |  |
| API_PERM_008 | INTERN gọi HR API | Bị chặn 403 | To Do |  |
| API_PERM_009 | MENTOR gọi Mentor API | Thành công | To Do |  |
| API_PERM_010 | INTERN gọi Mentor API | Bị chặn 403 | To Do |  |
| API_PERM_011 | INTERN gọi Intern API | Thành công | To Do |  |
| API_PERM_012 | Token sai/hết hạn gọi private API | Bị chặn | To Do |  |

---

## 7. Ghi chú review

### 7.1. Menu không phải là bảo mật chính

Nếu frontend ẩn menu nhưng backend không chặn API thì vẫn là lỗi bảo mật.

Ví dụ lỗi:

```text
INTERN không thấy menu User Management,
nhưng INTERN gọi được /api/admin/users bằng Postman.
```

Expected đúng:

```text
INTERN không thấy menu User Management,
và nếu gọi API admin thì bị 403.
```

---

### 7.2. Cần thống nhất quyền ADMIN

Cần chốt với team:

```text
ADMIN có được truy cập toàn bộ API hay không?
```

Nếu ADMIN là super admin, backend nên cho ADMIN vào cả HR, Mentor, Intern API.  
Nếu ADMIN chỉ quản trị hệ thống, quyền sẽ hẹp hơn.

Quyết định này cần ghi rõ trong tài liệu permission.

---

## 8. Definition of Done cho T-022

T-022 được coi là Done khi:

- [ ] Có checklist menu theo từng role.
- [ ] Có checklist API theo từng role.
- [ ] Có ghi rõ menu chỉ là frontend UX.
- [ ] Có ghi rõ backend API mới là lớp bảo vệ thật.
- [ ] Có xác nhận sai role bị chặn.
- [ ] Có ghi chú thống nhất quyền ADMIN.
