package com.codegym.internship.program.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.program.dto.InternScheduleResponse;
import com.codegym.internship.program.entity.ProgramAssignment;
import com.codegym.internship.program.repository.ProgramAssignmentRepository;
import com.codegym.internship.program.service.InternshipProgramService;
//import com.codegym.internship.security.SecurityUtils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.codegym.internship.user.repository.UserRepository;
import com.codegym.internship.user.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interns/me")
public class InternScheduleController {

    private final InternProfileRepository internProfileRepository;
    private final ProgramAssignmentRepository assignmentRepository;
    private final InternshipProgramService programService;

    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng hiện tại"));
    }

    @GetMapping("/schedule")
    public ApiResponse<?> getMySchedule() {
//        Long currentUserId = SecurityUtils.getCurrentUserId();

        Long currentUserId = getCurrentUser().getId();

        InternProfile profile = internProfileRepository.findByUserId(currentUserId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ intern"));

        return ApiResponse.success(
                assignmentRepository.findByInternProfile(profile)
                        .stream()
                        .map(this::toScheduleResponse)
                        .toList()
        );
    }

    private InternScheduleResponse toScheduleResponse(ProgramAssignment assignment) {
        return InternScheduleResponse.from(
                assignment,
                programService.calculateStatus(assignment.getProgram())
        );
    }
}

