package com.codegym.internship.user.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.user.dto.UserPageResponse;
import com.codegym.internship.user.dto.UserResponse;
import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.enums.UserStatus;
import com.codegym.internship.user.service.UserAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hr/users")
@RequiredArgsConstructor
public class UserHrController {

    private final UserAdminService userAdminService;

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
}