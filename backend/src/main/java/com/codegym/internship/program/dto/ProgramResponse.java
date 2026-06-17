package com.codegym.internship.program.dto;

import com.codegym.internship.program.entity.InternshipProgram;
import com.codegym.internship.program.entity.ProgramStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ProgramResponse {
    private Long id;
    private String name;
    private String description;
    private Long departmentId;
    private String departmentName;
    private Long mentorId;
    private String mentorName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer maxInterns;
    private ProgramStatus status;

    public static ProgramResponse from(InternshipProgram program, ProgramStatus status) {
        return new ProgramResponse(
                program.getId(),
                program.getName(),
                program.getDescription(),
                program.getDepartment().getId(),
                program.getDepartment().getName(),
                program.getMentor() != null ? program.getMentor().getId() : null,
                program.getMentor() != null ? program.getMentor().getFullName() : null,
                program.getStartDate(),
                program.getEndDate(),
                program.getMaxInterns(),
                status
        );
    }
}