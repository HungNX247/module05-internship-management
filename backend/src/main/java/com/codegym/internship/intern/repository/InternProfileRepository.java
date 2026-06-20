package com.codegym.internship.intern.repository;

import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.codegym.internship.intern.entity.InternProfileStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface InternProfileRepository extends JpaRepository<InternProfile, Long> {

    boolean existsByUser(User user);

    Optional<InternProfile> findByUser(User user);

    boolean existsByUserId(Long userId);

    Optional<InternProfile> findByUserId(Long userId);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByPhone(String phone);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    boolean existsByPhoneAndIdNot(String phone, Long id);

    @Query("""
        SELECT p
        FROM InternProfile p
        WHERE
            (:school IS NULL OR LOWER(p.school) LIKE LOWER(CONCAT('%', :school, '%')))
            AND (:major IS NULL OR LOWER(p.major) LIKE LOWER(CONCAT('%', :major, '%')))
            AND (:status IS NULL OR p.status = :status)
    """)
    Page<InternProfile> searchInternProfiles(
            @Param("school") String school,
            @Param("major") String major,
            @Param("status") InternProfileStatus status,
            Pageable pageable
    );

    long countByMentorId(Long mentorId);
}
