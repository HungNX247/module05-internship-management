package com.codegym.internship.contract.dto;

import com.codegym.internship.contract.entity.Contract;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ContractResponse {

    private Long id;
    private Long internProfileId;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private String status;
    private String fileUrl;
    private LocalDateTime uploadedAt;
    private LocalDateTime confirmedAt;

    public static ContractResponse fromEntity(Contract contract) {
        return new ContractResponse(
                contract.getId(),
                contract.getInternProfile().getId(),
                contract.getOriginalFileName(),
                contract.getContentType(),
                contract.getFileSize(),
                contract.getStatus().name(),
                "/api/contracts/" + contract.getId() + "/download",
                contract.getUploadedAt(),
                contract.getConfirmedAt()
        );
    }
}