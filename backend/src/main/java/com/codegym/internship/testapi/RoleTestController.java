package com.codegym.internship.testapi;

import com.codegym.internship.common.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleTestController {

    @GetMapping("/api/admin/test")
    public ApiResponse<String> adminTest() {
        return ApiResponse.success("Truy cập API ADMIN thành công", "ADMIN");
    }

    @GetMapping("/api/hr/test")
    public ApiResponse<String> hrTest() {
        return ApiResponse.success("Truy cập API HR thành công", "HR");
    }

    @GetMapping("/api/mentor/test")
    public ApiResponse<String> mentorTest() {
        return ApiResponse.success("Truy cập API MENTOR thành công", "MENTOR");
    }

    @GetMapping("/api/intern/test")
    public ApiResponse<String> internTest() {
        return ApiResponse.success("Truy cập API INTERN thành công", "INTERN");
    }
}
