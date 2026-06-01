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
public class InternProfileCreateRequest {

    @NotBlank(message = "Vui lòng nhập họ tên")
    @Size(max = 100, message = "Họ tên không được vượt quá 100 ký tự")
    private String fullName;

    @NotBlank(message = "Vui lòng nhập email")
    @Email(message = "Email không đúng định dạng")
    @Size(max = 150, message = "Email không được vượt quá 150 ký tự")
    private String email;

    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Pattern(regexp = "^\\d{10}$", message = "Số điện thoại phải gồm 10 chữ số")
    private String phone;

    @NotBlank(message = "Vui lòng nhập trường học")
    @Size(max = 150, message = "Tên trường không được vượt quá 150 ký tự")
    private String school;

    @NotBlank(message = "Vui lòng nhập ngành học")
    @Size(max = 150, message = "Ngành học không được vượt quá 150 ký tự")
    private String major;

    @NotBlank(message = "Vui lòng nhập năm học")
    @Size(max = 50, message = "Năm học không được vượt quá 50 ký tự")
    private String academicYear;

    @DecimalMin(value = "0.0", message = "GPA phải nằm trong khoảng 0.0 đến 4.0")
    @DecimalMax(value = "4.0", message = "GPA phải nằm trong khoảng 0.0 đến 4.0")
    private BigDecimal gpa;
}
