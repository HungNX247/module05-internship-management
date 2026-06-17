package com.codegym.internship.mentor.dto;

import com.codegym.internship.mentor.entity.Mentor;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MentorResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private Long departmentId;
    private String departmentName;
    private String position;
    private String expertise;
    private Integer maxInterns;
    private String status;

    public static MentorResponse fromEntity(Mentor mentor) {
        return new MentorResponse(
                mentor.getId(),
                mentor.getUser().getId(),
                mentor.getFullName(),
                mentor.getUser().getEmail(),
                mentor.getDepartment() == null ? null : mentor.getDepartment().getId(),
                mentor.getDepartment() == null ? null : mentor.getDepartment().getName(),
                mentor.getPosition(),
                mentor.getExpertise(),
                mentor.getMaxInterns(),
                mentor.getStatus().name()
        );
    }
}
