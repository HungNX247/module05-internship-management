package com.codegym.internship.intern.dto;

import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.entity.InternProfileStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

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
    private InternProfileStatus status;
    private String rejectReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long mentorId;
    private String mentorName;

    public static InternProfileResponse fromEntity(InternProfile profile) {
        Long mentorId = null;
        String mentorName = null;

        if (profile.getMentor() != null) {
            mentorId = profile.getMentor().getId();
            mentorName = profile.getMentor().getUser().getFullName();
        }

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
                profile.getStatus(),
                profile.getRejectReason(),
                profile.getCreatedAt(),
                profile.getUpdatedAt(),
                mentorId,
                mentorName
        );
    }
}
