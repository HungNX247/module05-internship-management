package com.codegym.internship.mentor.repository;

import com.codegym.internship.mentor.entity.Mentor;
import com.codegym.internship.mentor.entity.MentorStatus;
import com.codegym.internship.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, Long> {

    boolean existsByUser(User user);

    Optional<Mentor> findByUser(User user);

    List<Mentor> findByStatus(MentorStatus status);

    @Query("""
            SELECT m
            FROM Mentor m
            WHERE (:keyword IS NULL
                OR LOWER(m.user.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(m.user.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(m.expertise) LIKE LOWER(CONCAT('%', :keyword, '%')))
              AND (:status IS NULL OR m.status = :status)
            ORDER BY m.id DESC
            """)
    List<Mentor> searchMentors(
            @Param("keyword") String keyword,
            @Param("status") MentorStatus status
    );
}