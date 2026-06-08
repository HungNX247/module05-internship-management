package com.codegym.internship.intern.service;

import com.codegym.internship.intern.dto.*;
import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.entity.InternProfileStatus;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.notification.service.EmailService;
import com.codegym.internship.user.entity.User;
import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.repository.UserRepository;
//import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

//sửa import jakarta.transaction.Transactional; thành import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InternProfileService {

    private final InternProfileRepository internProfileRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Transactional
    public InternProfileResponse createProfile(InternProfileCreateRequest request) {
        User currentUser = getCurrentUser();

        if (currentUser.getRole().getCode() != Role.INTERN) {
            throw new AccessDeniedException("Chỉ thực tập sinh mới được tạo hồ sơ");
        }

        if (internProfileRepository.existsByUser(currentUser)) {
            throw new IllegalArgumentException("Hồ sơ thực tập sinh đã tồn tại");
        }

        InternProfile profile = new InternProfile();
        profile.setUser(currentUser);
        profile.setFullName(request.getFullName().trim());
        profile.setEmail(request.getEmail().trim());
        profile.setPhone(request.getPhone().trim());
        profile.setSchool(request.getSchool().trim());
        profile.setMajor(request.getMajor().trim());
        profile.setAcademicYear(request.getAcademicYear().trim());
        profile.setGpa(request.getGpa());
        profile.setStatus(InternProfileStatus.DRAFT);

        InternProfile savedProfile = internProfileRepository.save(profile);
        return InternProfileResponse.fromEntity(savedProfile);
    }

    @Transactional
    public InternProfileResponse updateProfile(Long id, InternProfileUpdateRequest request) {
        User currentUser = getCurrentUser();

        InternProfile profile = internProfileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ thực tập sinh"));

        if (currentUser.getRole().getCode() != Role.INTERN) {
            throw new AccessDeniedException("Chỉ thực tập sinh mới được cập nhật hồ sơ");
        }

        if (!profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Bạn không có quyền cập nhật hồ sơ này");
        }

        if (profile.getStatus() != InternProfileStatus.DRAFT) {
            throw new IllegalArgumentException("Chỉ hồ sơ nháp mới được cập nhật");
        }

        profile.setFullName(request.getFullName().trim());
        profile.setEmail(request.getEmail().trim());
        profile.setPhone(request.getPhone().trim());
        profile.setSchool(request.getSchool().trim());
        profile.setMajor(request.getMajor().trim());
        profile.setAcademicYear(request.getAcademicYear().trim());
        profile.setGpa(request.getGpa());

        InternProfile savedProfile = internProfileRepository.save(profile);
        return InternProfileResponse.fromEntity(savedProfile);
    }

    @Transactional(readOnly = true)
    public InternProfileResponse getMyProfile() {
        User currentUser = getCurrentUser();

        if (!isIntern(currentUser)) {
            throw new AccessDeniedException("Chỉ thực tập sinh mới được xem hồ sơ của mình");
        }

        return internProfileRepository.findByUser(currentUser)
                .map(InternProfileResponse::fromEntity)
                .orElse(null);
    }

    @Transactional
    public InternProfileResponse submitProfile(Long id) {
        User currentUser = getCurrentUser();

        InternProfile profile = internProfileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ thực tập sinh"));

        if (!isIntern(currentUser)) {
            throw new AccessDeniedException("Chỉ thực tập sinh mới được nộp hồ sơ");
        }

        if (!profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Bạn không có quyền nộp hồ sơ này");
        }

        if (profile.getStatus() != InternProfileStatus.DRAFT) {
            throw new IllegalArgumentException("Chỉ hồ sơ nháp mới được nộp");
        }

        profile.setStatus(InternProfileStatus.PENDING);

        InternProfile savedProfile = internProfileRepository.save(profile);
        return InternProfileResponse.fromEntity(savedProfile);
    }

    @Transactional
    public InternProfileResponse approveProfile(Long id) {
        User currentUser = getCurrentUser();

        if (!isHr(currentUser) && !isAdmin(currentUser)) {
            throw new AccessDeniedException("Only HR or ADMIN can approve intern profile");
        }

        InternProfile profile = internProfileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Intern profile not found"));

        if (profile.getStatus() != InternProfileStatus.PENDING) {
            throw new IllegalArgumentException("Only PENDING profile can be approved");
        }

        profile.setStatus(InternProfileStatus.APPROVED);
        profile.setRejectReason(null);

        InternProfile savedProfile = internProfileRepository.save(profile);

        try {
            emailService.sendApprovalEmail(savedProfile);
        } catch (Exception ex) {
            // Không làm fail API approve nếu gửi email lỗi.
            // Demo ưu tiên trạng thái hồ sơ vẫn được cập nhật đúng.
            System.err.println("Send approval email failed: " + ex.getMessage());
        }

        return InternProfileResponse.fromEntity(savedProfile);
    }

    @Transactional
    public InternProfileResponse rejectProfile(Long id, RejectProfileRequest request) {
        User currentUser = getCurrentUser();

        if (!isHr(currentUser) && !isAdmin(currentUser)) {
            throw new AccessDeniedException("Only HR or ADMIN can reject intern profile");
        }

        InternProfile profile = internProfileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Intern profile not found"));

        if (profile.getStatus() != InternProfileStatus.PENDING) {
            throw new IllegalArgumentException("Only PENDING profile can be rejected");
        }

        String rejectReason = request.getRejectReason().trim();

        profile.setStatus(InternProfileStatus.REJECTED);
        profile.setRejectReason(rejectReason);

        InternProfile savedProfile = internProfileRepository.save(profile);

        try {
            emailService.sendRejectEmail(savedProfile, rejectReason);
        } catch (Exception ex) {
            // Không làm fail API reject nếu gửi email lỗi.
            System.err.println("Send reject email failed: " + ex.getMessage());
        }

        return InternProfileResponse.fromEntity(savedProfile);
    }

    @Transactional
    public InternProfileResponse getProfileDetail(Long id) {
        User currentUser = getCurrentUser();

        InternProfile profile = internProfileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ thực tập sinh"));

        if (isIntern(currentUser) && !profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Bạn không có quyền xem hồ sơ này");
        }

        if (isHr(currentUser) || isAdmin(currentUser) || isIntern(currentUser)) {
            return InternProfileResponse.fromEntity(profile);
        }

        throw new AccessDeniedException("Bạn không có quyền xem hồ sơ này");
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng hiện tại"));
    }

    private boolean isIntern(User user) {
        return user.getRole().getCode() == Role.INTERN;
    }

    private boolean isHr(User user) {
        return user.getRole().getCode() == Role.HR;
    }

    private boolean isAdmin(User user) {
        return user.getRole().getCode() == Role.ADMIN;
    }

    @Transactional(readOnly = true)
    public InternProfilePageResponse getInternProfiles(
            int page,
            int size,
            String school,
            String major,
            InternProfileStatus status
    ) {
        User currentUser = getCurrentUser();

        if (!isHr(currentUser) && !isAdmin(currentUser)) {
            throw new AccessDeniedException("Chỉ HR hoặc ADMIN mới được xem danh sách hồ sơ thực tập sinh");
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("id").descending()
        );

        String normalizedSchool = normalizeFilter(school);
        String normalizedMajor = normalizeFilter(major);

        Page<InternProfile> profilePage = internProfileRepository.searchInternProfiles(
                normalizedSchool,
                normalizedMajor,
                status,
                pageable
        );

        return new InternProfilePageResponse(
                profilePage.getContent()
                        .stream()
                        .map(InternProfileResponse::fromEntity)
                        .toList(),
                profilePage.getNumber(),
                profilePage.getSize(),
                profilePage.getTotalElements(),
                profilePage.getTotalPages()
        );
    }

    private String normalizeFilter(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }

}
