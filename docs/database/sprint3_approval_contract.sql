ALTER TABLE intern_profiles
    ADD COLUMN reject_reason VARCHAR(500) NULL;

UPDATE intern_profiles
SET status = 'APPROVED'
WHERE status = 'SUBMITTED';

CREATE TABLE IF NOT EXISTS contracts (
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
    CONSTRAINT fk_contracts_intern_profiles
        FOREIGN KEY (intern_profile_id) REFERENCES intern_profiles(id)
);
