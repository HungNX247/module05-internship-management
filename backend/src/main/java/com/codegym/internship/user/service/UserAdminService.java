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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserAdminService {

    private static final String VIETNAM_PHONE_REGEX = "^0(3|5|7|8|9)\\d{8}$";
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreateRequest request) {
        validateCreate(request);

        RoleEntity role = roleRepository.findByCode(request.getRole())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy vai trò"));

        User user = new User();
        user.setFullName(normalizeText(request.getFullName()));
        user.setEmail(normalizeText(request.getEmail()));
        user.setPhone(normalizeText(request.getPhone()));
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setStatus(request.getStatus() == null ? UserStatus.ACTIVE : request.getStatus());

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    private void validateCreate(UserCreateRequest request) {
        String email = normalizeText(request.getEmail());
        String phone = normalizeText(request.getPhone());

        validateVietnamPhone(phone);

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }

        if (phone != null && !phone.isBlank()
                && userRepository.existsByPhone(phone)) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại");
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
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));
        return toResponse(user);
    }

    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User currentUser = getCurrentUser();

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

        validateUpdate(id, request);

        RoleEntity role = roleRepository.findByCode(request.getRole())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy vai trò"));

        user.setFullName(normalizeText(request.getFullName()));
        user.setEmail(normalizeText(request.getEmail()));
        user.setPhone(normalizeText(request.getPhone()));

        if (!currentUser.getId().equals(id)) {
            user.setRole(role);
            user.setStatus(request.getStatus());
        } else {
            // Nếu là chính mình, giữ nguyên role và status cũ
            user.setRole(currentUser.getRole());
            user.setStatus(currentUser.getStatus());
        }

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    private void validateUpdate(Long id, UserUpdateRequest request) {
        String email = normalizeText(request.getEmail());
        String phone = normalizeText(request.getPhone());

        validateVietnamPhone(phone);

        if (userRepository.existsByEmailAndIdNot(email, id)) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }

        if (phone != null && !phone.isBlank()
                && userRepository.existsByPhoneAndIdNot(phone, id)) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại");
        }
    }

    public UserResponse updateStatus(Long id, UserStatusRequest request) {
        User currentUser = getCurrentUser();
        if (currentUser.getId().equals(id)) {
            throw new IllegalArgumentException("Không thể khóa hoặc mở khóa tài khoản của chính bạn");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

        user.setStatus(request.getStatus());

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng hiện tại"));
    }

    private void validateVietnamPhone(String phone) {
        if (phone == null || phone.isBlank()) {
            return;
        }

        String normalizedPhone = phone.trim();

        if (!normalizedPhone.matches(VIETNAM_PHONE_REGEX)) {
            throw new IllegalArgumentException("Số điện thoại không đúng định dạng Việt Nam");
        }
    }

    private String normalizeText(String value) {
        return value == null ? null : value.trim();
    }
}