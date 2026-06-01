package com.codegym.internship.user.dto;

import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.enums.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {

    @NotBlank(message = "Vui lòng nhập họ tên")
    private String fullName;

    @NotBlank(message = "Vui lòng nhập email")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(
            regexp = "^0(3|5|7|8|9)\\d{8}$",
            message = "Số điện thoại không đúng định dạng Việt Nam"
    )
    private String phone;

    @NotNull(message = "Vui lòng chọn vai trò")
    private Role role;

    @NotNull(message = "Vui lòng chọn trạng thái")
    private UserStatus status;
}
