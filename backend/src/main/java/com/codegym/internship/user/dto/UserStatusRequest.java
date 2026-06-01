package com.codegym.internship.user.dto;

import com.codegym.internship.user.enums.UserStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStatusRequest {

    @NotNull(message = "Vui lòng chọn trạng thái")
    private UserStatus status;
}