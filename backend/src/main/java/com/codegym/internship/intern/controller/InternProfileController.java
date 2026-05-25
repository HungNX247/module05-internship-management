package com.codegym.internship.intern.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.intern.dto.InternProfileCreateRequest;
import com.codegym.internship.intern.dto.InternProfileResponse;
import com.codegym.internship.intern.dto.InternProfileUpdateRequest;
import com.codegym.internship.intern.service.InternProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.codegym.internship.intern.dto.InternProfilePageResponse;
import com.codegym.internship.intern.entity.InternProfileStatus;

@RestController
@RequestMapping("/api/interns")
@RequiredArgsConstructor
public class InternProfileController {

    private final InternProfileService internProfileService;

    @PostMapping
    public ApiResponse<InternProfileResponse> createProfile(
            @Valid @RequestBody InternProfileCreateRequest request
    ) {
        InternProfileResponse response = internProfileService.createProfile(request);
        return ApiResponse.success("Create intern profile successfully", response);
    }

    @PutMapping("/{id}")
    public ApiResponse<InternProfileResponse> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody InternProfileUpdateRequest request
    ) {
        InternProfileResponse response = internProfileService.updateProfile(id, request);
        return ApiResponse.success("Update intern profile successfully", response);
    }

    @GetMapping("/{id}")
    public ApiResponse<InternProfileResponse> getProfileDetail(@PathVariable Long id) {
        InternProfileResponse response = internProfileService.getProfileDetail(id);
        return ApiResponse.success("Get intern profile successfully", response);
    }

    @GetMapping
    public ApiResponse<InternProfilePageResponse> getInternProfiles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String school,
            @RequestParam(required = false) String major,
            @RequestParam(required = false) InternProfileStatus status
    ) {
        InternProfilePageResponse response = internProfileService.getInternProfiles(
                page,
                size,
                school,
                major,
                status
        );

        return ApiResponse.success("Get intern profiles successfully", response);
    }
}
