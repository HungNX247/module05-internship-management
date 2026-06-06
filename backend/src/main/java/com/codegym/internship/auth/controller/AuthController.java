package com.codegym.internship.auth.controller;

import com.codegym.internship.auth.dto.CurrentUserResponse;
import com.codegym.internship.auth.dto.LoginRequest;
import com.codegym.internship.auth.dto.LoginResponse;
import com.codegym.internship.auth.service.AuthService;
import com.codegym.internship.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ApiResponse.success("Đăng nhập thành công", response);
    }

    @GetMapping("/me")
    public ApiResponse<CurrentUserResponse> me(Authentication authentication) {
        String email = authentication.getName();
        CurrentUserResponse response = authService.getCurrentUser(email);
        return ApiResponse.success("Lấy thông tin người dùng hiện tại thành công", response);
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout() {
        return ApiResponse.success("Đăng xuất thành công", null);
    }
}
