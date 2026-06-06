package com.codegym.internship.contract.repository;

import com.codegym.internship.contract.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    List<Contract> findByInternProfileIdOrderByUploadedAtDesc(Long internProfileId);

    Optional<Contract> findTopByInternProfileIdOrderByUploadedAtDesc(Long internProfileId);
}