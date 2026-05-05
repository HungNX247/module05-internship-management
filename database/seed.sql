USE internship_management;

INSERT INTO roles (code, name, description)
VALUES
    ('ADMIN', 'Administrator', 'Quản trị hệ thống'),
    ('HR', 'Human Resource', 'Nhân sự quản lý thực tập sinh'),
    ('MENTOR', 'Mentor', 'Người hướng dẫn thực tập sinh'),
    ('INTERN', 'Intern', 'Thực tập sinh');

INSERT INTO departments (code, name, description)
VALUES
    ('IT', 'Information Technology', 'Phòng Công nghệ thông tin'),
    ('HR', 'Human Resource', 'Phòng Nhân sự'),
    ('MKT', 'Marketing', 'Phòng Marketing');

-- Password hash chỉ là ví dụ. Sprint 1 backend sẽ xử lý BCrypt thực tế.
INSERT INTO users (full_name, email, phone, password_hash, role_id, status)
VALUES
    ('System Admin', 'admin@gmail.com', '0900000000', '$2a$10$example', 1, 'ACTIVE');
