package com.codegym.internship.mentor.dto;

import com.codegym.internship.mentor.entity.MentorStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorUpdateRequest {

    private Long departmentId;

    @Size(max = 100, message = "Position must not exceed 100 characters")
    private String position;

    @Size(max = 255, message = "Expertise must not exceed 255 characters")
    private String expertise;

    @Min(value = 1, message = "Max interns must be greater than 0")
    private Integer maxInterns;

    private MentorStatus status;
}
