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

CREATE TABLE interns (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         user_id BIGINT UNIQUE,
                         full_name VARCHAR(150) NOT NULL,
                         email VARCHAR(150) NOT NULL,
                         phone VARCHAR(20),
                         school VARCHAR(150),
                         major VARCHAR(150),
                         year_of_study INT,
                         gpa DECIMAL(3,2),
                         mentor_id BIGINT,
                         status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         CONSTRAINT fk_interns_users FOREIGN KEY (user_id) REFERENCES users(id),
                         CONSTRAINT fk_interns_mentors FOREIGN KEY (mentor_id) REFERENCES mentors(id)
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
                                 intern_id BIGINT NOT NULL,
                                 joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                 status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
                                 CONSTRAINT fk_program_interns_programs FOREIGN KEY (program_id) REFERENCES programs(id),
                                 CONSTRAINT fk_program_interns_interns FOREIGN KEY (intern_id) REFERENCES interns(id),
                                 CONSTRAINT uk_program_intern UNIQUE (program_id, intern_id)
);
