package com.codegym.internship.program.repository;

import com.codegym.internship.program.entity.InternshipProgram;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InternshipProgramRepository extends JpaRepository<InternshipProgram, Long> {

    @Override
    @EntityGraph(attributePaths = {"department", "mentor"})
    List<InternshipProgram> findAll();

    @Override
    @EntityGraph(attributePaths = {"department", "mentor"})
    Optional<InternshipProgram> findById(Long id);
}
