USE internship_management;

INSERT INTO roles (code, name, description)
VALUES
    ('ADMIN', 'Administrator', 'Quản trị hệ thống'),
    ('HR', 'Human Resource', 'Nhân sự quản lý thực tập sinh'),
    ('MENTOR', 'Mentor', 'Người hướng dẫn thực tập sinh'),
    ('INTERN', 'Intern', 'Thực tập sinh')
    ON DUPLICATE KEY UPDATE
                         name = VALUES(name),
                         description = VALUES(description);

INSERT INTO users (
    full_name,
    email,
    phone,
    password_hash,
    role_id,
    status
)
SELECT
    'System Admin',
    'admin@gmail.com',
    '0900000000',
    '$2a$10$yxBpW.kpoQ3x2i85B1UFVuEfCR3yEyfAuQpXPXabyPd69HbibLv4O',
    r.id,
    'ACTIVE'
FROM roles r
WHERE r.code = 'ADMIN'
    ON DUPLICATE KEY UPDATE
                         full_name = VALUES(full_name),
                         phone = VALUES(phone),
                         role_id = VALUES(role_id),
                         status = VALUES(status);
