package com.codegym.internship.intern.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RejectProfileRequest {

    @NotBlank(message = "Ly do tu choi khong duoc de trong")
    @Size(max = 500, message = "Ly do tu choi khong duoc vuot qua 500 ky tu")
    private String rejectReason;
}
