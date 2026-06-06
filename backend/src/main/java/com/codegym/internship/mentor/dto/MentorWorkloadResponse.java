package com.codegym.internship.mentor.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MentorWorkloadResponse {

    private Long mentorId;
    private String mentorName;
    private String departmentName;
    private Integer maxInterns;
    private Long assignedInterns;
    private Integer availableSlots;
}
