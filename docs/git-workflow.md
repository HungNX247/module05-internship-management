# Git Workflow - Internship Management System

## 1. Branch chính

| Branch | Ý nghĩa |
|---|---|
| main | Bản ổn định, dùng để demo/deploy |
| develop | Nhánh tích hợp code của cả nhóm |
| feature/* | Nhánh làm chức năng mới |
| bugfix/* | Nhánh sửa bug |
| release/* | Nhánh chốt cuối Sprint |
| hotfix/* | Nhánh sửa lỗi gấp trên main |

---

## 2. Quy định chung

1. Không code trực tiếp vào main.
2. Không code trực tiếp vào develop.
3. Mỗi task phải tạo branch riêng từ develop.
4. Làm xong phải tạo Pull Request vào develop.
5. Không tự merge Pull Request của mình.
6. Trước khi code phải pull develop mới nhất.
7. Không commit file .env, password, token, secret.
8. Ai sửa file config, route, dependency thì báo nhóm.

---

## 3. Quy trình làm task

Trước khi code:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<ten-task>