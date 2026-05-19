package com.codegym.internship.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class UserPageResponse {

    private List<UserResponse> items;

    private int page;

    private int size;

    private long totalItems;

    private int totalPages;
}
