package com.codegym.internship.user.service;

import com.codegym.internship.user.dto.*;
import com.codegym.internship.user.entity.*;
import com.codegym.internship.user.enums.UserStatus;
import com.codegym.internship.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.codegym.internship.user.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserAdminService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreateRequest request) {
        validateCreate(request);

        RoleEntity role = roleRepository.findByCode(request.getRole())
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setStatus(request.getStatus() == null ? UserStatus.ACTIVE : request.getStatus());

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    private void validateCreate(UserCreateRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (request.getPhone() != null && !request.getPhone().isBlank()
                && userRepository.existsByPhone(request.getPhone())) {
            throw new IllegalArgumentException("Phone already exists");
        }
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().getCode(),
                user.getStatus()
        );
    }

    public UserPageResponse getUsers(
            int page,
            int size,
            String keyword,
            Role role,
            UserStatus status
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("id").descending()
        );

        String normalizedKeyword = null;

        if (keyword != null && !keyword.isBlank()) {
            normalizedKeyword = keyword.trim();
        }

        Page<User> userPage = userRepository.searchUsers(
                normalizedKeyword,
                role,
                status,
                pageable
        );

        List<UserResponse> items = userPage
                .getContent()
                .stream()
                .map(this::toResponse)
                .toList();

        return new UserPageResponse(
                items,
                userPage.getNumber(),
                userPage.getSize(),
                userPage.getTotalElements(),
                userPage.getTotalPages()
        );
    }

    public UserResponse getUserDetail(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toResponse(user);
    }

    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        validateUpdate(id, request);

        RoleEntity role = roleRepository.findByCode(request.getRole())
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRole(role);
        user.setStatus(request.getStatus());

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    private void validateUpdate(Long id, UserUpdateRequest request) {
        if (userRepository.existsByEmailAndIdNot(request.getEmail(), id)) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (request.getPhone() != null && !request.getPhone().isBlank()
                && userRepository.existsByPhoneAndIdNot(request.getPhone(), id)) {
            throw new IllegalArgumentException("Phone already exists");
        }
    }

    public UserResponse updateStatus(Long id, UserStatusRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setStatus(request.getStatus());

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }
}