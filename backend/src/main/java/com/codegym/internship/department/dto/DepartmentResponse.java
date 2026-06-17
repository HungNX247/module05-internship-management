package com.codegym.internship.department.dto;

import com.codegym.internship.department.entity.Department;
import com.codegym.internship.department.entity.DepartmentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepartmentResponse {
    private Long id;
    private String name;
    private String description;
    private DepartmentStatus status;

    public static DepartmentResponse from(Department department) {
        return new DepartmentResponse(
                department.getId(),
                department.getName(),
                department.getDescription(),
                department.getStatus()
        );
    }
}