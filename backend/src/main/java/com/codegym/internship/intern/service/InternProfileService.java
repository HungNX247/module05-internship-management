package com.codegym.internship.intern.service;

import com.codegym.internship.intern.dto.InternProfileCreateRequest;
import com.codegym.internship.intern.dto.InternProfileResponse;
import com.codegym.internship.intern.dto.InternProfileUpdateRequest;
import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.entity.InternProfileStatus;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.user.entity.User;
import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InternProfileService {

    private final InternProfileRepository internProfileRepository;
    private final UserRepository userRepository;

    @Transactional
    public InternProfileResponse createProfile(InternProfileCreateRequest request) {
        User currentUser = getCurrentUser();

        if (currentUser.getRole().getCode() != Role.INTERN) {
            throw new AccessDeniedException("Only INTERN can create intern profile");
        }

        if (internProfileRepository.existsByUser(currentUser)) {
            throw new IllegalArgumentException("Intern profile already exists");
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
                .orElseThrow(() -> new IllegalArgumentException("Intern profile not found"));

        if (currentUser.getRole().getCode() != Role.INTERN) {
            throw new AccessDeniedException("Only INTERN can update intern profile");
        }

        if (!profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to update this profile");
        }

        if (profile.getStatus() != InternProfileStatus.DRAFT) {
            throw new IllegalArgumentException("Only DRAFT profile can be updated");
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

    @Transactional
    public InternProfileResponse getProfileDetail(Long id) {
        User currentUser = getCurrentUser();

        InternProfile profile = internProfileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Intern profile not found"));

        if (isIntern(currentUser) && !profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to view this profile");
        }

        if (isHr(currentUser) || isAdmin(currentUser) || isIntern(currentUser)) {
            return InternProfileResponse.fromEntity(profile);
        }

        throw new AccessDeniedException("You do not have permission to view this profile");
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Current user not found"));
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
}
