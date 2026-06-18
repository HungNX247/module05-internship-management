package com.codegym.internship.program.service;

import com.codegym.internship.department.entity.Department;
import com.codegym.internship.department.service.DepartmentService;
import com.codegym.internship.mentor.entity.Mentor;
import com.codegym.internship.mentor.repository.MentorRepository;
import com.codegym.internship.program.dto.ProgramRequest;
import com.codegym.internship.program.dto.ProgramResponse;
import com.codegym.internship.program.entity.InternshipProgram;
import com.codegym.internship.program.entity.ProgramStatus;
import com.codegym.internship.program.repository.InternshipProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InternshipProgramService {

    private final InternshipProgramRepository programRepository;
    private final DepartmentService departmentService;
    private final MentorRepository mentorRepository;

    public List<ProgramResponse> findAll() {
        return programRepository.findAll()
                .stream()
                .map(program -> ProgramResponse.from(program, calculateStatus(program)))
                .toList();
    }

    public ProgramResponse findById(Long id) {
        InternshipProgram program = getEntityById(id);
        return ProgramResponse.from(program, calculateStatus(program));
    }

    public InternshipProgram getEntityById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy chương trình"));
    }

    @Transactional
    public ProgramResponse create(ProgramRequest request) {
        validateDate(request);

        InternshipProgram program = new InternshipProgram();
        applyRequest(program, request);
        return ProgramResponse.from(programRepository.save(program), calculateStatus(program));
    }

    @Transactional
    public ProgramResponse update(Long id, ProgramRequest request) {
        validateDate(request);

        InternshipProgram program = getEntityById(id);
        applyRequest(program, request);
        return ProgramResponse.from(programRepository.save(program), calculateStatus(program));
    }

    private void applyRequest(InternshipProgram program, ProgramRequest request) {
        Department department = departmentService.getEntityById(request.getDepartmentId());
        Mentor mentor = null;
        if (request.getMentorId() != null) {
            mentor = mentorRepository.findById(request.getMentorId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy mentor"));
        }

        program.setName(request.getName().trim());
        program.setDescription(request.getDescription());
        program.setDepartment(department);
        program.setMentor(mentor);
        program.setStartDate(request.getStartDate());
        program.setEndDate(request.getEndDate());
        program.setMaxInterns(request.getMaxInterns());
    }

    private void validateDate(ProgramRequest request) {
        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new IllegalArgumentException("Ngày bắt đầu và ngày kết thúc là bắt buộc");
        }
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new IllegalArgumentException("Ngày kết thúc không được trước ngày bắt đầu");
        }
    }

    public ProgramStatus calculateStatus(InternshipProgram program) {
        LocalDate today = LocalDate.now();
        if (today.isBefore(program.getStartDate())) return ProgramStatus.UPCOMING;
        if (today.isAfter(program.getEndDate())) return ProgramStatus.FINISHED;
        return ProgramStatus.RUNNING;
    }
}