package com.codegym.internship.intern.dto;


import com.codegym.internship.intern.entity.InternProfile;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class InternProfileResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String school;
    private String major;
    private String academicYear;
    private BigDecimal gpa;
    private String status;
    private String rejectReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static InternProfileResponse fromEntity(InternProfile profile) {
        return new InternProfileResponse(
                profile.getId(),
                profile.getUser().getId(),
                profile.getFullName(),
                profile.getEmail(),
                profile.getPhone(),
                profile.getSchool(),
                profile.getMajor(),
                profile.getAcademicYear(),
                profile.getGpa(),
                profile.getStatus().name(),
                profile.getRejectReason(),
                profile.getCreatedAt(),
                profile.getUpdatedAt()
        );
    }
}