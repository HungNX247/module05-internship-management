package com.codegym.internship.program.repository;

import com.codegym.internship.program.entity.InternshipProgram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipProgramRepository extends JpaRepository<InternshipProgram, Long> {
}