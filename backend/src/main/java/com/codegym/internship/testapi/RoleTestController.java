package com.codegym.internship.testapi;

import com.codegym.internship.common.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleTestController {

    @GetMapping("/api/admin/test")
    public ApiResponse<String> adminTest() {
        return ApiResponse.success("Admin API access OK", "ADMIN");
    }

    @GetMapping("/api/hr/test")
    public ApiResponse<String> hrTest() {
        return ApiResponse.success("HR API access OK", "HR");
    }

    @GetMapping("/api/mentor/test")
    public ApiResponse<String> mentorTest() {
        return ApiResponse.success("Mentor API access OK", "MENTOR");
    }

    @GetMapping("/api/intern/test")
    public ApiResponse<String> internTest() {
        return ApiResponse.success("Intern API access OK", "INTERN");
    }
}
