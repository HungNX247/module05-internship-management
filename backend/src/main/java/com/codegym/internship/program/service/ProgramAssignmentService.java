package com.codegym.internship.program.service;

import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.entity.InternProfileStatus;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.program.dto.AssignInternRequest;
import com.codegym.internship.program.dto.ProgramAssignmentResponse;
import com.codegym.internship.program.entity.InternshipProgram;
import com.codegym.internship.program.entity.ProgramAssignment;
import com.codegym.internship.program.entity.ProgramStatus;
import com.codegym.internship.program.repository.ProgramAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramAssignmentService {

    private final ProgramAssignmentRepository assignmentRepository;
    private final InternshipProgramService programService;
    private final InternProfileRepository internProfileRepository;

    @Transactional
    public List<ProgramAssignmentResponse> assignInterns(Long programId,
                                                         AssignInternRequest request) {
        InternshipProgram program = programService.getEntityById(programId);
        ProgramStatus status = programService.calculateStatus(program);

        if (status == ProgramStatus.FINISHED) {
            throw new IllegalArgumentException("Không thể gán intern vào chương trình đã kết thúc");
        }

        long currentCount = assignmentRepository.countByProgram(program);
        if (currentCount + request.getInternProfileIds().size() > program.getMaxInterns()) {
            throw new IllegalArgumentException("Vượt quá số lượng intern tối đa của chương trình");
        }

        List<ProgramAssignmentResponse> responses = new ArrayList<>();
        for (Long internProfileId : request.getInternProfileIds()) {
            InternProfile internProfile = internProfileRepository.findById(internProfileId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ intern"));

                            validateInternCanAssign(program, internProfile);

            ProgramAssignment assignment = new ProgramAssignment();
            assignment.setProgram(program);
            assignment.setInternProfile(internProfile);
            responses.add(ProgramAssignmentResponse.from(assignmentRepository.save(assignment)));
        }

        return responses;
    }

    private void validateInternCanAssign(InternshipProgram program, InternProfile internProfile)
    {
        if (internProfile.getStatus() != InternProfileStatus.APPROVED) {
            throw new IllegalArgumentException("Chỉ được gán intern đã được duyệt hồ sơ");
        }

        if (assignmentRepository.existsByProgramAndInternProfile(program, internProfile)) {
            throw new IllegalArgumentException("Intern đã được gán vào chương trình này");
        }
    }

    public List<ProgramAssignmentResponse> findByInternProfile(InternProfile internProfile) {
        return assignmentRepository.findByInternProfile(internProfile)
                .stream()
                .map(ProgramAssignmentResponse::from)
                .toList();
    }
}

