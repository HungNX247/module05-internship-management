package com.codegym.internship.mentor.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.mentor.dto.*;
import com.codegym.internship.mentor.entity.MentorStatus;
import com.codegym.internship.mentor.service.MentorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;

import java.util.List;

@RestController
@RequestMapping("/api/hr/mentors")
@RequiredArgsConstructor
public class MentorController {

    private final MentorService mentorService;

    @PostMapping
    public ApiResponse<MentorResponse> createMentor(
            @Valid @RequestBody MentorCreateRequest request
    ) {
        MentorResponse response = mentorService.createMentor(request);
        return ApiResponse.success("Create mentor successfully", response);
    }

    @GetMapping
    public ApiResponse<List<MentorResponse>> getMentors(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) MentorStatus status
    ) {
        List<MentorResponse> response = mentorService.getMentors(keyword, status);
        return ApiResponse.success("Get mentors successfully", response);
    }

    @GetMapping("/{id}")
    public ApiResponse<MentorResponse> getMentorDetail(@PathVariable Long id) {
        MentorResponse response = mentorService.getMentorDetail(id);
        return ApiResponse.success("Get mentor successfully", response);
    }

    @PutMapping("/{id}")
    public ApiResponse<MentorResponse> updateMentor(
            @PathVariable Long id,
            @Valid @RequestBody MentorUpdateRequest request
    ) {
        MentorResponse response = mentorService.updateMentor(id, request);
        return ApiResponse.success("Update mentor successfully", response);
    }

    @PatchMapping("/assign/{internProfileId}")
    public ApiResponse<MentorResponse> assignMentorToIntern(
            @PathVariable Long internProfileId,
            @Valid @RequestBody MentorAssignmentRequest request
    ) {
        MentorResponse response = mentorService.assignMentorToIntern(internProfileId, request);
        return ApiResponse.success("Assign mentor successfully", response);
    }

    @GetMapping("/workload")
    public ApiResponse<List<MentorWorkloadResponse>> getMentorWorkloads() {
        List<MentorWorkloadResponse> response = mentorService.getMentorWorkloads();
        return ApiResponse.success("Get mentor workload successfully", response);
    }
}