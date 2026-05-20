package com.codegym.internship.intern.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InternProfileUpdateRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^\\d{10}$", message = "Phone format is invalid")
    private String phone;

    @NotBlank(message = "School is required")
    @Size(max = 150, message = "School must not exceed 150 characters")
    private String school;

    @NotBlank(message = "Major is required")
    @Size(max = 150, message = "Major must not exceed 150 characters")
    private String major;

    @NotBlank(message = "Academic year is required")
    @Size(max = 50, message = "Academic year must not exceed 50 characters")
    private String academicYear;

    @DecimalMin(value = "0.0", message = "GPA must be between 0.0 and 4.0")
    @DecimalMax(value = "4.0", message = "GPA must be between 0.0 and 4.0")
    private BigDecimal gpa;
}
