package com.codegym.internship.program.dto;

import com.codegym.internship.program.entity.ProgramAssignment;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProgramAssignmentResponse {
    private Long id;
    private Long programId;
    private String programName;
    private Long internProfileId;
    private String internName;
    private LocalDateTime assignedAt;

    public static ProgramAssignmentResponse from(ProgramAssignment assignment) {
        return new ProgramAssignmentResponse(
                assignment.getId(),
                assignment.getProgram().getId(),
                assignment.getProgram().getName(),
                assignment.getInternProfile().getId(),
                assignment.getInternProfile().getFullName(),
                assignment.getAssignedAt()
        );
    }
}

