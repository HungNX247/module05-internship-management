package com.codegym.internship.intern.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InternProfilePageResponse {

    private List<InternProfileResponse> items;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}
