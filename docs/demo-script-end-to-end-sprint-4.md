# Kich ban demo end-to-end du an Internship Management

## 1. Muc tieu demo

Demo luong quan ly thuc tap sinh tu dau den cuoi:

- Dang nhap va phan quyen theo role.
- Intern tao, nop ho so va upload tai lieu.
- HR xem, duyet ho so, upload hop dong.
- Intern xac nhan hop dong.
- HR quan ly phong ban, mentor, chuong trinh thuc tap.
- HR gan intern vao chuong trinh.
- Intern xem lich/chuong trinh thuc tap ca nhan.

## 2. Chuan bi truoc demo

Chay backend:

```bash
cd backend
./gradlew bootRun
```

Chay frontend:

```bash
cd frontend
npm run dev
```

Tai khoan demo mac dinh:

| Role | Email | Mat khau | Muc dich |
|------|-------|----------|----------|
| ADMIN | admin@gmail.com | 123456 | Quan tri he thong |
| HR | hr@gmail.com | 123456 | Quan ly ho so, phong ban, mentor, program |
| MENTOR | mentor@gmail.com | 123456 | Tai khoan mentor |
| INTERN | intern@gmail.com | 123456 | Tao ho so, xem hop dong, xem lich |

## 3. Mo dau demo

Loi gioi thieu:

> Hom nay nhom em demo he thong Internship Management. He thong ho tro doanh nghiep quan ly quy trinh thuc tap sinh tu luc intern nop ho so, HR duyet ho so, quan ly hop dong, mentor, phong ban, chuong trinh thuc tap, den Sprint 4 la gan intern vao chuong trinh va intern xem lich thuc tap ca nhan.

## 4. Demo Sprint 1 - Dang nhap va phan quyen

### Buoc 1: Dang nhap

1. Mo trang login.
2. Dang nhap bang tai khoan `admin@gmail.com / 123456`.
3. Chi ra dashboard admin va menu theo role ADMIN.

Noi khi demo:

> He thong dung JWT de dang nhap. Sau khi login thanh cong, giao dien hien thi menu theo role cua nguoi dung.

### Buoc 2: Kiem tra role HR / INTERN

1. Logout.
2. Dang nhap `hr@gmail.com / 123456`.
3. Chi ra HR co menu quan ly intern, mentor, program, department.
4. Logout.
5. Dang nhap `intern@gmail.com / 123456`.
6. Chi ra intern chi thay cac man hinh cua intern nhu ho so, hop dong, lich thuc tap.

Noi khi demo:

> Moi role co menu va quyen truy cap khac nhau. Cac API phia backend cung duoc bao ve bang Spring Security.

## 5. Demo Sprint 2 - Ho so intern va upload tai lieu

### Buoc 1: Intern tao ho so

1. Dang nhap tai khoan INTERN.
2. Vao menu Ho so cua toi.
3. Nhap thong tin:
   - Ho ten.
   - Email.
   - So dien thoai.
   - Truong hoc.
   - Chuyen nganh.
   - Nam hoc.
   - GPA.
4. Luu ho so.

Noi khi demo:

> Intern co the tao ho so ca nhan. He thong validate cac truong bat buoc va dinh dang nhu email, so dien thoai, GPA.

### Buoc 2: Upload tai lieu

1. Vao phan tai lieu.
2. Upload CV hoac don xin thuc tap.
3. Chi ra danh sach tai lieu da upload.

Noi khi demo:

> Sprint 2 co chuc nang upload tai lieu. Backend kiem tra file va gioi han dung luong, frontend hien thi danh sach tai lieu cua intern.

### Buoc 3: Nop ho so

1. Bam nop ho so.
2. Trang thai ho so chuyen sang PENDING.

Noi khi demo:

> Sau khi nop, ho so chuyen sang trang thai cho HR duyet. Intern khong the sua ho so da nop neu khong bi tu choi.

## 6. Demo Sprint 3 - HR duyet ho so, hop dong va mentor

### Buoc 1: HR xem danh sach intern

1. Dang nhap `hr@gmail.com / 123456`.
2. Vao menu Thuc tap sinh.
3. Loc ho so theo status PENDING.
4. Mo chi tiet ho so intern.

Noi khi demo:

> HR co the xem danh sach ho so intern, loc theo trang thai va xem chi tiet tung ho so.

### Buoc 2: HR duyet ho so

1. Trong chi tiet intern, bam Duyet.
2. Trang thai ho so chuyen thanh APPROVED.

Noi khi demo:

> Sprint 3 quy dinh intern hop le la ho so da duoc APPROVED. Trang thai nay se duoc Sprint 4 dung de gan intern vao chuong trinh.

### Buoc 3: HR upload hop dong

1. Upload hop dong cho intern da duyet.
2. Chi ra thong tin hop dong.

Noi khi demo:

> Sau khi ho so duoc duyet, HR co the upload hop dong cho intern. Hop dong ban dau o trang thai da upload.

### Buoc 4: Intern xac nhan hop dong

1. Dang nhap tai khoan INTERN.
2. Vao menu Hop dong.
3. Xem hop dong va bam xac nhan.

Noi khi demo:

> Intern co the xem hop dong cua minh va xac nhan hop dong. Day la mot phan cua quy trinh truoc khi bat dau thuc tap.

### Buoc 5: Quan ly mentor

1. Dang nhap HR.
2. Vao menu Quan ly Mentor.
3. Tao hoac xem danh sach mentor.
4. Chi ra mentor co phong ban, chuyen mon, so luong intern toi da.

Noi khi demo:

> Mentor duoc quan ly rieng va co the gan voi phong ban. Thong tin mentor se duoc dung khi tao chuong trinh thuc tap o Sprint 4.

## 7. Demo Sprint 4 - Department, Program, Assignment, Schedule

### Buoc 1: HR quan ly phong ban

1. Dang nhap HR.
2. Vao menu Quan ly phong ban.
3. Tao phong ban moi, vi du:
   - Ten phong ban: Backend Department.
   - Mo ta: Phong phu trach backend.
   - Trang thai: ACTIVE.
4. Sua phong ban vua tao.
5. Loc theo ACTIVE / INACTIVE.
6. Bam Ngung hoat dong voi mot phong ban ACTIVE.

Noi khi demo:

> Sprint 4 bo sung man hinh quan ly phong ban. HR co the tao, sua, loc theo trang thai va ngung hoat dong phong ban.

### Buoc 2: HR tao chuong trinh thuc tap

1. Vao menu Chuong trinh thuc tap.
2. Bam Them chuong trinh.
3. Nhap thong tin:
   - Ten chuong trinh: Backend Internship 06/2026.
   - Phong ban: Backend Department.
   - Mentor: chon mentor co san.
   - Ngay bat dau.
   - Ngay ket thuc.
   - So luong intern toi da.
   - Mo ta.
4. Luu chuong trinh.

Noi khi demo:

> Khi tao chuong trinh, frontend va backend deu validate ten chuong trinh, phong ban, mentor, ngay bat dau, ngay ket thuc va so luong intern toi da.

### Buoc 3: Demo validate Program

Thu nhanh cac case:

1. De trong ten chuong trinh.
2. Khong chon phong ban.
3. Khong chon mentor.
4. De ngay ket thuc nho hon ngay bat dau.
5. Nhap so luong intern toi da bang 0.

Noi khi demo:

> Cac loi validate duoc chan ngay tren UI va backend cung co validate tuong ung de dam bao du lieu dung.

### Buoc 4: Danh sach chuong trinh va badge trang thai

1. Quay lai danh sach chuong trinh.
2. Chi ra cac cot:
   - Ten chuong trinh.
   - Phong ban.
   - Mentor.
   - Thoi gian.
   - So luong.
   - Trang thai.
3. Loc theo trang thai UPCOMING, RUNNING, FINISHED.

Noi khi demo:

> Trang thai chuong trinh khong nhap tay ma duoc tinh theo ngay bat dau va ngay ket thuc. Neu chua toi ngay bat dau thi la UPCOMING, dang trong khoang thoi gian thi RUNNING, qua ngay ket thuc thi FINISHED.

### Buoc 5: HR gan intern vao chuong trinh

1. Tai danh sach program, bam Gan intern.
2. He thong hien thi danh sach intern da APPROVED.
3. Chon intern va bam Gan thuc tap sinh.
4. Quay ve danh sach program.

Noi khi demo:

> Sprint 4 co chuc nang gan intern vao chuong trinh. Backend chi cho gan intern da APPROVED, khong cho gan trung, khong cho vuot qua so luong toi da va khong cho gan vao chuong trinh da ket thuc.

### Buoc 6: Demo rule assignment

Co the mo ta hoac thao tac nhanh:

1. Gan lai intern da duoc gan vao cung chuong trinh: UI da an intern da gan, backend cung chan trung.
2. Gan vuot maxInterns: backend bao loi.
3. Gan vao program FINISHED: UI disable thao tac, backend cung chan.

Noi khi demo:

> Cac rule nghiep vu quan trong duoc xu ly ca o frontend de trai nghiem tot hon va backend de dam bao an toan du lieu.

### Buoc 7: Intern xem lich thuc tap ca nhan

1. Dang nhap tai khoan INTERN da duoc gan vao chuong trinh.
2. Vao menu Lich thuc tap.
3. Chi ra bang lich gom:
   - Ten chuong trinh.
   - Phong ban.
   - Mentor.
   - Ngay bat dau.
   - Ngay ket thuc.
   - Trang thai chuong trinh.

Noi khi demo:

> Sau khi HR gan intern vao chuong trinh, intern co the tu dang nhap va xem lich thuc tap ca nhan. API schedule da fetch day du program, department va mentor de hien thi thong tin ro rang.

## 8. Bug list va test UI Sprint 4

Mo file:

```text
docs/sprint-4-ui-bug-list-duy.md
```

Noi khi demo:

> Nhom da ghi lai bug list Sprint 4 cho UI Department, Program Assignment va Intern Schedule. Cac loi UX nhu chua chan gan intern vao program da ket thuc, hoac intern da gan van hien trong danh sach chon, da duoc fix.

## 9. Checklist ket thuc demo

Truoc khi ket thuc, nhac lai:

- Intern tao va nop ho so.
- HR duyet ho so thanh APPROVED.
- HR upload hop dong.
- Intern xac nhan hop dong.
- HR tao phong ban.
- HR tao chuong trinh thuc tap.
- HR gan intern vao chuong trinh.
- Intern xem lich thuc tap ca nhan.
- Program co status UPCOMING, RUNNING, FINISHED.
- Co bug list/test UI Sprint 4.

## 10. Loi ket demo

> Qua 4 sprint, he thong da co du luong chinh cua quan ly thuc tap sinh: xac thuc va phan quyen, quan ly ho so va tai lieu, duyet ho so va hop dong, quan ly mentor, phong ban, chuong trinh thuc tap, gan intern vao chuong trinh va intern xem lich thuc tap ca nhan. Sprint 4 hoan thien phan program/assignment/schedule, giup quy trinh tu luc nop ho so den khi bat dau thuc tap duoc lien ket thanh mot luong day du.
