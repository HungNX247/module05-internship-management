package com.codegym.internship.program.dto;

import com.codegym.internship.program.entity.ProgramAssignment;
import com.codegym.internship.program.entity.ProgramStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class InternScheduleResponse {
    private Long programId;
    private String programName;
    private String departmentName;
    private String mentorName;
    private LocalDate startDate;
    private LocalDate endDate;
    private ProgramStatus status;

    public static InternScheduleResponse from(ProgramAssignment assignment, ProgramStatus
            status) {
        return new InternScheduleResponse(
                assignment.getProgram().getId(),
                assignment.getProgram().getName(),
                assignment.getProgram().getDepartment().getName(),
                assignment.getProgram().getMentor() != null
                        ? assignment.getProgram().getMentor().getFullName()
                        : null,
                assignment.getProgram().getStartDate(),
                assignment.getProgram().getEndDate(),
                status
        );
    }
}

