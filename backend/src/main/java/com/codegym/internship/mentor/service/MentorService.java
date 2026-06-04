package com.codegym.internship.mentor.service;

import com.codegym.internship.department.entity.Department;
import com.codegym.internship.department.repository.DepartmentRepository;
import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.entity.InternProfileStatus;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.mentor.dto.MentorAssignmentRequest;
import com.codegym.internship.mentor.dto.MentorCreateRequest;
import com.codegym.internship.mentor.dto.MentorResponse;
import com.codegym.internship.mentor.dto.MentorUpdateRequest;
import com.codegym.internship.mentor.dto.MentorWorkloadResponse;
import com.codegym.internship.mentor.entity.Mentor;
import com.codegym.internship.mentor.entity.MentorStatus;
import com.codegym.internship.mentor.repository.MentorRepository;
import com.codegym.internship.user.entity.User;
import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MentorService {

    private final MentorRepository mentorRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final InternProfileRepository internProfileRepository;

    @Transactional
    public MentorResponse createMentor(MentorCreateRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (user.getRole().getCode() != Role.MENTOR) {
            throw new IllegalArgumentException("Selected user must have MENTOR role");
        }

        if (mentorRepository.existsByUser(user)) {
            throw new IllegalArgumentException("This user is already a mentor");
        }

        Mentor mentor = new Mentor();
        mentor.setUser(user);
        mentor.setDepartment(findDepartmentOrNull(request.getDepartmentId()));
        mentor.setPosition(trim(request.getPosition()));
        mentor.setExpertise(trim(request.getExpertise()));
        mentor.setMaxInterns(request.getMaxInterns() == null ? 5 : request.getMaxInterns());
        mentor.setStatus(MentorStatus.ACTIVE);

        return MentorResponse.fromEntity(mentorRepository.save(mentor));
    }

    @Transactional(readOnly = true)
    public List<MentorResponse> getMentors(String keyword, MentorStatus status) {
        String normalizedKeyword = keyword == null || keyword.isBlank() ? null : keyword.trim();
        return mentorRepository.searchMentors(normalizedKeyword, status)
                .stream()
                .map(MentorResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public MentorResponse getMentorDetail(Long id) {
        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Mentor not found"));
        return MentorResponse.fromEntity(mentor);
    }

    @Transactional
    public MentorResponse updateMentor(Long id, MentorUpdateRequest request) {
        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Mentor not found"));

        mentor.setDepartment(findDepartmentOrNull(request.getDepartmentId()));
        mentor.setPosition(trim(request.getPosition()));
        mentor.setExpertise(trim(request.getExpertise()));
        mentor.setMaxInterns(request.getMaxInterns() == null ? mentor.getMaxInterns() : request.getMaxInterns());
        mentor.setStatus(request.getStatus() == null ? mentor.getStatus() : request.getStatus());

        return MentorResponse.fromEntity(mentorRepository.save(mentor));
    }

    private Department findDepartmentOrNull(Long departmentId) {
        if (departmentId == null) {
            return null;
        }
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new IllegalArgumentException("Department not found"));
    }

    private String trim(String value) {
        return value == null ? null : value.trim();
    }

    @Transactional
    public MentorResponse assignMentorToIntern(Long internProfileId, MentorAssignmentRequest request) {
        InternProfile profile = internProfileRepository.findById(internProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Intern profile not found"));

        if (profile.getStatus() != InternProfileStatus.APPROVED) {
            throw new IllegalArgumentException("Only APPROVED profile can be assigned to mentor");
        }

        Mentor mentor = mentorRepository.findById(request.getMentorId())
                .orElseThrow(() -> new IllegalArgumentException("Mentor not found"));

        if (mentor.getStatus() != MentorStatus.ACTIVE) {
            throw new IllegalArgumentException("Only ACTIVE mentor can be assigned");
        }

        long currentWorkload = internProfileRepository.countByMentorId(mentor.getId());
        if (currentWorkload >= mentor.getMaxInterns()) {
            throw new IllegalArgumentException("Mentor has reached maximum intern capacity");
        }

        profile.setMentor(mentor);
        internProfileRepository.save(profile);

        return MentorResponse.fromEntity(mentor);
    }

    @Transactional(readOnly = true)
    public List<MentorWorkloadResponse> getMentorWorkloads() {
        return mentorRepository.findByStatus(MentorStatus.ACTIVE)
                .stream()
                .map(mentor -> {
                    long assigned = internProfileRepository.countByMentorId(mentor.getId());
                    int max = mentor.getMaxInterns() == null ? 0 : mentor.getMaxInterns();
                    int available = Math.max(max - (int) assigned, 0);

                    return new MentorWorkloadResponse(
                            mentor.getId(),
                            mentor.getUser().getFullName(),
                            mentor.getDepartment() == null ? null : mentor.getDepartment().getName(),
                            mentor.getMaxInterns(),
                            assigned,
                            available
                    );
                })
                .toList();
    }
}
