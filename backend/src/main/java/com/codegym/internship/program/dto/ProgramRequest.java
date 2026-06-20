package com.codegym.internship.program.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ProgramRequest {

    @NotBlank(message = "Tên chương trình không được để trống")
    private String name;

    private String description;

    @NotNull(message = "Phòng ban không được để trống")
    private Long departmentId;

    @NotNull(message = "Mentor không được để trống")
    private Long mentorId;

    @NotNull(message = "Ngày bắt đầu không được để trống")
    private LocalDate startDate;

    @NotNull(message = "Ngày kết thúc không được để trống")
    private LocalDate endDate;

    @NotNull(message = "Số lượng intern tối đa không được để trống")
    @Min(value = 1, message = "Số lượng intern tối đa phải lớn hơn 0")
    private Integer maxInterns;
}
