package com.codegym.internship.user.repository;

import com.codegym.internship.user.entity.RoleEntity;
import com.codegym.internship.user.enums.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

    Optional<RoleEntity> findByCode(Role code);
    /* check nội dung*/
}
