package com.codegym.internship.program.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AssignInternRequest {

    @NotEmpty(message = "Danh sách intern không được để trống")
    private List<Long> internProfileIds;
}

