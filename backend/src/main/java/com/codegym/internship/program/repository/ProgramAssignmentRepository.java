package com.codegym.internship.program.repository;

import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.program.entity.InternshipProgram;
import com.codegym.internship.program.entity.ProgramAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgramAssignmentRepository extends JpaRepository<ProgramAssignment, Long> {

    boolean existsByProgramAndInternProfile(InternshipProgram program, InternProfile
            internProfile);

    long countByProgram(InternshipProgram program);

    List<ProgramAssignment> findByInternProfile(InternProfile internProfile);
}
