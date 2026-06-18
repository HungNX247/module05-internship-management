package com.codegym.internship.program.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.program.dto.AssignInternRequest;
import com.codegym.internship.program.service.ProgramAssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/programs")
public class ProgramAssignmentController {

    private final ProgramAssignmentService assignmentService;

    @PostMapping("/{programId}/assign-interns")
    public ApiResponse<?> assignInterns(@PathVariable Long programId,
                                        @Valid @RequestBody AssignInternRequest request) {
        return ApiResponse.success(assignmentService.assignInterns(programId, request));
    }
}

