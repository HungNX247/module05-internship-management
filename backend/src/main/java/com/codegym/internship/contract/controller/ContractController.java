package com.codegym.internship.contract.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.contract.dto.ContractResponse;
import com.codegym.internship.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping("/api/interns/{id}/contract")
    public ApiResponse<ContractResponse> uploadContract(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) {
        ContractResponse response = contractService.uploadContract(id, file);
        return ApiResponse.success("Upload contract successfully", response);
    }

    @GetMapping("/api/interns/{id}/contract")
    public ApiResponse<ContractResponse> getLatestContract(@PathVariable Long id) {
        ContractResponse response = contractService.getLatestContractByInternProfile(id);
        return ApiResponse.success("Get contract successfully", response);
    }

    @PatchMapping("/api/contracts/{id}/confirm")
    public ApiResponse<ContractResponse> confirmContract(@PathVariable Long id) {
        ContractResponse response = contractService.confirmContract(id);
        return ApiResponse.success("Confirm contract successfully", response);
    }

    @GetMapping("/api/contracts/{id}/download")
    public ResponseEntity<Resource> downloadContract(@PathVariable Long id) {
        Resource resource = contractService.downloadContract(id);
        String fileName = contractService.getOriginalFileName(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName + "")
                .body(resource);
    }
}