package com.codegym.internship.intern.repository;

import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternProfileRepository extends JpaRepository<InternProfile, Long> {

    boolean existsByUser(User user);

    Optional<InternProfile> findByUser(User user);

    boolean existsByUserId(Long userId);

    Optional<InternProfile> findByUserId(Long userId);
}
