## Pre-Demo Checklist - Module 05 Internship Management (Frontend)

### Cấu hình
- [ ] VITE_HR_INTERN_MOCK=false trong .env local đang dùng demo
- [ ] axiosClient baseURL trỏ đúng BE đang chạy

### Luồng Intern (role INTERN)
- [ ] Login → vào /intern/profile không lỗi
- [ ] User chưa có profile → thấy form tạo mới (không phải lỗi đỏ)
- [ ] Tạo profile mới → save thành công, status=DRAFT
- [ ] Upload document → list hiển thị đúng tên/loại/size, không có "undefined"
- [ ] Tải document → file tải về đúng
- [ ] Submit profile → status SUBMITTED, form bị khóa
- [ ] F5 sau submit → vẫn SUBMITTED, vẫn khóa
- [ ] Field GPA validate min/max/step đúng
- [ ] Field disabled không sửa được

### Luồng HR (role HR)
- [ ] Login HR → vào /hr/dashboard, /hr/interns OK
- [ ] Danh sách intern hiển thị, mở chi tiết được

### Luồng ADMIN
- [ ] Login ADMIN → vào /hr/interns được (theo nghiệp vụ đã chốt)

### UI/UX
- [ ] Không có menu nào trong sidebar bấm vào ra 404
- [ ] Tất cả lỗi API hiển thị message tiếng Việt dễ hiểu
- [ ] Form có loading state khi submit/upload
- [ ] Không có "undefined"/"null" hiển thị trên UI

### DevTools
- [ ] Network tab: không request 404 ngoài kỳ vọng
- [ ] Console: không có warning React unknown prop hoặc key duplicate
