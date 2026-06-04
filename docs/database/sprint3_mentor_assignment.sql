ALTER TABLE intern_profiles
    ADD COLUMN mentor_id BIGINT NULL;

ALTER TABLE intern_profiles
    ADD CONSTRAINT fk_intern_profiles_mentors
        FOREIGN KEY (mentor_id) REFERENCES mentors(id);
