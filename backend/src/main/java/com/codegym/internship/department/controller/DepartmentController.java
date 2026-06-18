package com.codegym.internship.department.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.department.dto.DepartmentRequest;
import com.codegym.internship.department.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public ApiResponse<?> findAll() {
        return ApiResponse.success(departmentService.findAll());
    }

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody DepartmentRequest request) {
        return ApiResponse.success(departmentService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable Long id,
                                 @Valid @RequestBody DepartmentRequest request) {
        return ApiResponse.success(departmentService.update(id, request));
    }
}