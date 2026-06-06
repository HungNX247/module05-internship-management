package com.codegym.internship.auth.dto;

import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CurrentUserResponse {

    private Long id;
    private String fullName;
    private String email;
    private Role role;
    private UserStatus status;
}
