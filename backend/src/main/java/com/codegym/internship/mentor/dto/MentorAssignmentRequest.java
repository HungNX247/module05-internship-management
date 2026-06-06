package com.codegym.internship.mentor.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorAssignmentRequest {

    @NotNull(message = "Mentor is required")
    private Long mentorId;
}
