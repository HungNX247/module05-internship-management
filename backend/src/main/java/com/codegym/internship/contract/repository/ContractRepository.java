package com.codegym.internship.contract.repository;

import com.codegym.internship.contract.entity.Contract;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    List<Contract> findByInternProfileIdOrderByUploadedAtDesc(Long internProfileId);

    Optional<Contract> findTopByInternProfileIdOrderByUploadedAtDesc(Long internProfileId);
}
