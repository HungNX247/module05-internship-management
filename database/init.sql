CREATE DATABASE IF NOT EXISTS internship_management
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE internship_management;

CREATE TABLE roles (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       code VARCHAR(50) NOT NULL UNIQUE,
                       name VARCHAR(100) NOT NULL,
                       description VARCHAR(255),
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       full_name VARCHAR(150) NOT NULL,
                       email VARCHAR(150) NOT NULL UNIQUE,
                       phone VARCHAR(20) UNIQUE,
                       password_hash VARCHAR(255) NOT NULL,
                       role_id BIGINT NOT NULL,
                       status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE departments (
                             id BIGINT PRIMARY KEY AUTO_INCREMENT,
                             code VARCHAR(50) NOT NULL UNIQUE,
                             name VARCHAR(150) NOT NULL,
                             description VARCHAR(255),
                             status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
                             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE mentors (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         user_id BIGINT NOT NULL UNIQUE,
                         department_id BIGINT,
                         position VARCHAR(100),
                         expertise VARCHAR(255),
                         max_interns INT DEFAULT 5,
                         status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         CONSTRAINT fk_mentors_users FOREIGN KEY (user_id) REFERENCES users(id),
                         CONSTRAINT fk_mentors_departments FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE intern_profiles (
                                 id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                 user_id BIGINT NOT NULL UNIQUE,
                                 full_name VARCHAR(100) NOT NULL,
                                 email VARCHAR(150) NOT NULL,
                                 phone VARCHAR(10) NOT NULL,
                                 school VARCHAR(150) NOT NULL,
                                 major VARCHAR(150) NOT NULL,
                                 academic_year VARCHAR(50) NOT NULL,
                                 gpa DECIMAL(4,2),
                                 mentor_id BIGINT,
    --    mentor_id BIGINT, -- Ẩn tạm thời cho Sprint 1, phát triển sau
                                 status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
                                 reject_reason VARCHAR(500),
                                 created_at DATETIME,
                                 updated_at DATETIME,
                                 CONSTRAINT fk_intern_profiles_users FOREIGN KEY (user_id) REFERENCES users(id),
                                 CONSTRAINT fk_intern_profiles_mentors FOREIGN KEY (mentor_id) REFERENCES mentors(id),
    --    CONSTRAINT fk_intern_profiles_mentors FOREIGN KEY (mentor_id) REFERENCES mentors(id), -- Ẩn tạm thời
                                 CONSTRAINT uk_intern_profiles_user UNIQUE (user_id)
);

CREATE TABLE documents (
                           id BIGINT PRIMARY KEY AUTO_INCREMENT,
                           intern_profile_id BIGINT NOT NULL,
                           document_type VARCHAR(50) NOT NULL,
                           original_file_name VARCHAR(255) NOT NULL,
                           stored_file_name VARCHAR(255) NOT NULL,
                           file_path VARCHAR(500) NOT NULL,
                           content_type VARCHAR(100),
                           file_size BIGINT NOT NULL,
                           uploaded_at DATETIME NOT NULL,
                           CONSTRAINT fk_documents_intern_profiles FOREIGN KEY (intern_profile_id) REFERENCES intern_profiles(id)
);

CREATE TABLE contracts (
                           id BIGINT PRIMARY KEY AUTO_INCREMENT,
                           intern_profile_id BIGINT NOT NULL,
                           original_file_name VARCHAR(255) NOT NULL,
                           stored_file_name VARCHAR(255) NOT NULL,
                           file_path VARCHAR(500) NOT NULL,
                           content_type VARCHAR(100),
                           file_size BIGINT NOT NULL,
                           status VARCHAR(30) NOT NULL DEFAULT 'UPLOADED',
                           uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                           confirmed_at DATETIME NULL,
                           CONSTRAINT fk_contracts_intern_profiles FOREIGN KEY (intern_profile_id) REFERENCES intern_profiles(id)
);

CREATE TABLE programs (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          name VARCHAR(150) NOT NULL,
                          department_id BIGINT,
                          start_date DATE,
                          end_date DATE,
                          description TEXT,
                          status VARCHAR(30) NOT NULL DEFAULT 'UPCOMING',
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          CONSTRAINT fk_programs_departments FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE program_interns (
                                 id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                 program_id BIGINT NOT NULL,
                                 intern_profile_id BIGINT NOT NULL,
                                 joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                 status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
                                 CONSTRAINT fk_program_interns_programs FOREIGN KEY (program_id) REFERENCES programs(id),
                                 CONSTRAINT fk_program_interns_intern_profiles FOREIGN KEY (intern_profile_id) REFERENCES intern_profiles(id),
                                 CONSTRAINT uk_program_intern UNIQUE (program_id, intern_profile_id)
);
