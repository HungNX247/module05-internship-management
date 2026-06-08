package com.codegym.internship.intern.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.intern.dto.*;
import com.codegym.internship.intern.entity.InternProfileStatus;
import com.codegym.internship.intern.service.InternProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        return ApiResponse.success("Tạo hồ sơ thực tập sinh thành công", response);
    }

    @PutMapping("/{id}")
    public ApiResponse<InternProfileResponse> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody InternProfileUpdateRequest request
    ) {
        InternProfileResponse response = internProfileService.updateProfile(id, request);
        return ApiResponse.success("Cập nhật hồ sơ thực tập sinh thành công", response);
    }

    @GetMapping("/me")
    public ApiResponse<InternProfileResponse> getMyProfile() {
        InternProfileResponse response = internProfileService.getMyProfile();
        return ApiResponse.success("Lấy hồ sơ thực tập sinh của tôi thành công", response);
    }

    @PostMapping("/{id}/submit")
    public ApiResponse<InternProfileResponse> submitProfile(@PathVariable Long id) {
        InternProfileResponse response = internProfileService.submitProfile(id);
        return ApiResponse.success("Nộp hồ sơ thực tập sinh thành công. Hồ sơ đang chờ duyệt", response);
    }

    // Thêm 2 endpoint này trong class InternProfileController
    @PatchMapping("/{id}/approve")
    public ApiResponse<InternProfileResponse> approveProfile(@PathVariable Long id) {
        InternProfileResponse response = internProfileService.approveProfile(id);
        return ApiResponse.success("Approve intern profile successfully", response);
    }

    @PatchMapping("/{id}/reject")
    public ApiResponse<InternProfileResponse> rejectProfile(
            @PathVariable Long id,
            @Valid @RequestBody RejectProfileRequest request
    ) {
        InternProfileResponse response = internProfileService.rejectProfile(id);
        return ApiResponse.success("Reject intern profile successfully", response);
    }

    @GetMapping("/{id}")
    public ApiResponse<InternProfileResponse> getProfileDetail(@PathVariable Long id) {
        InternProfileResponse response = internProfileService.getProfileDetail(id);
        return ApiResponse.success("Lấy hồ sơ thực tập sinh thành công", response);
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

        return ApiResponse.success("Lấy danh sách hồ sơ thực tập sinh thành công", response);
    }

}
