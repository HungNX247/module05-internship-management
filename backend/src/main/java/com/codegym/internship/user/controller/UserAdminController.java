package com.codegym.internship.user.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.user.dto.*;
import com.codegym.internship.user.service.UserAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.enums.UserStatus;


@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class UserAdminController {

    private final UserAdminService userAdminService;

    @PostMapping
    public ApiResponse<UserResponse> createUser(
            @Valid @RequestBody UserCreateRequest request
    ) {
        UserResponse response = userAdminService.createUser(request);
        return ApiResponse.success("Tạo người dùng thành công", response);
    }

    @GetMapping
    public ApiResponse<UserPageResponse> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Role role,
            @RequestParam(required = false) UserStatus status
    ) {
        UserPageResponse response = userAdminService.getUsers(
                page,
                size,
                keyword,
                role,
                status
        );

        return ApiResponse.success("Lấy danh sách người dùng thành công", response);
    }


    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserDetail(@PathVariable Long id) {
        UserResponse response = userAdminService.getUserDetail(id);
        return ApiResponse.success("Lấy chi tiết người dùng thành công", response);
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request
    ) {
        UserResponse response = userAdminService.updateUser(id, request);
        return ApiResponse.success("Cập nhật người dùng thành công", response);
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<UserResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UserStatusRequest request
    ) {
        UserResponse response = userAdminService.updateStatus(id, request);
        return ApiResponse.success("Cập nhật trạng thái người dùng thành công", response);
    }
}
