package com.codegym.internship.program.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.program.dto.ProgramRequest;
import com.codegym.internship.program.service.InternshipProgramService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/programs")
public class InternshipProgramController {

    private final InternshipProgramService programService;

    @GetMapping
    public ApiResponse<?> findAll() {
        return ApiResponse.success(programService.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<?> findById(@PathVariable Long id) {
        return ApiResponse.success(programService.findById(id));
    }

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody ProgramRequest request) {
        return ApiResponse.success(programService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable Long id,
                                 @Valid @RequestBody ProgramRequest request) {
        return ApiResponse.success(programService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        programService.delete(id);
        return ApiResponse.success(null);
    }
}
