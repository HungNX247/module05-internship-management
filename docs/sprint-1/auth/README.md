# Sprint 1 - Auth QA Documents

## 1. Mục đích

Bộ tài liệu này phục vụ phần việc của Nguyễn Xuân Hùng trong Sprint 1 với vai trò:

- Nhóm trưởng
- BA
- QA
- Scrum Master
- Integration Owner
- Demo Owner

## 2. Danh sách tài liệu

| File | Mục đích |
|---|---|
| `acceptance-criteria.md` | Tiêu chí pass/fail cho Login, Logout, Auth Me |
| `auth-test-cases.md` | Test case login positive/negative |
| `permission-test-cases.md` | Test case phân quyền Admin/HR/Mentor/Intern |
| `fe-be-auth-flow-checklist.md` | Checklist kiểm tra FE gọi BE đúng flow |
| `role-menu-api-permission-checklist.md` | Checklist review menu theo role và API permission |

## 3. Cách dùng trong team

Long đọc:

- `acceptance-criteria.md`
- `auth-test-cases.md`
- `permission-test-cases.md`

Nguyệt/Duy đọc:

- `acceptance-criteria.md`
- `fe-be-auth-flow-checklist.md`
- `role-menu-api-permission-checklist.md`

Hùng dùng toàn bộ tài liệu để:

- Review PR
- Test API
- Test FE-BE integration
- Kiểm tra demo readiness

## 4. Branch gợi ý

```bash
git checkout develop
git pull origin develop
git checkout -b feature/sprint-1-auth-qa-docs
```

## 5. Commit gợi ý

```bash
git add docs/sprint-1/auth/
git commit -m "docs(auth): add sprint 1 auth QA documents"
git push origin feature/sprint-1-auth-qa-docs
```

## 6. Pull Request

Base branch:

```text
develop
```

Compare branch:

```text
feature/sprint-1-auth-qa-docs
```

PR title:

```text
[SPRINT 1] Add auth QA documents and permission checklist
```
