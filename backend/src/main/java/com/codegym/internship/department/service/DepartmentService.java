package com.codegym.internship.department.service;

import com.codegym.internship.department.dto.DepartmentRequest;
import com.codegym.internship.department.dto.DepartmentResponse;
import com.codegym.internship.department.entity.Department;
import com.codegym.internship.department.entity.DepartmentStatus;
import com.codegym.internship.department.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<DepartmentResponse> findAll() {
        return departmentRepository.findAll()
                .stream()
                .map(DepartmentResponse::from)
                .toList();
    }

    public Department getEntityById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy phòng ban"));
    }

    public DepartmentResponse findById(Long id) {
        return DepartmentResponse.from(getEntityById(id));
    }

    @Transactional
    public DepartmentResponse create(DepartmentRequest request) {
        String name = request.getName().trim();
        if (departmentRepository.existsByNameIgnoreCase(name)) {
            throw new IllegalArgumentException("Tên phòng ban đã tồn tại");
        }

        Department department = new Department();
        department.setName(name);
        department.setDescription(request.getDescription());
        department.setStatus(parseStatus(request.getStatus()));
        return DepartmentResponse.from(departmentRepository.save(department));
    }

    @Transactional
    public DepartmentResponse update(Long id, DepartmentRequest request) {
        Department department = getEntityById(id);
        String name = request.getName().trim();

        departmentRepository.findByNameIgnoreCase(name).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new IllegalArgumentException("Tên phòng ban đã tồn tại");
            }
        });

        department.setName(name);
        department.setDescription(request.getDescription());
        department.setStatus(parseStatus(request.getStatus()));
        return DepartmentResponse.from(departmentRepository.save(department));
    }

    @Transactional
    public void delete(Long id) {
        Department department = getEntityById(id);
        department.setStatus(DepartmentStatus.INACTIVE);
        departmentRepository.save(department);
    }

    private DepartmentStatus parseStatus(String status) {
        if (status == null || status.isBlank()) return DepartmentStatus.ACTIVE;
        return DepartmentStatus.valueOf(status.trim().toUpperCase());
    }
}
