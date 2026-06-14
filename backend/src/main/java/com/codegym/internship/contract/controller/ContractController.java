package com.codegym.internship.contract.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.contract.dto.ContractResponse;
import com.codegym.internship.contract.entity.Contract;
import com.codegym.internship.contract.service.ContractService;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping("/api/interns/{id}/contract")
    public ApiResponse<ContractResponse> uploadContractByInternProfile(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) {
        ContractResponse response = contractService.uploadContract(id, file);
        return ApiResponse.success("Upload contract successfully", response);
    }

    @PostMapping("/api/contracts/upload")
    public ApiResponse<ContractResponse> uploadContract(
            @RequestParam("internProfileId") Long internProfileId,
            @RequestParam("file") MultipartFile file
    ) {
        ContractResponse response = contractService.uploadContract(internProfileId, file);
        return ApiResponse.success("Upload contract successfully", response);
    }

    @GetMapping("/api/interns/{id}/contract")
    public ApiResponse<ContractResponse> getLatestContract(@PathVariable Long id) {
        ContractResponse response = contractService.getLatestContractByInternProfile(id);
        return ApiResponse.success("Get contract successfully", response);
    }

    @GetMapping("/api/contracts/interns/{id}")
    public ApiResponse<ContractResponse> getLatestContractByInternProfile(@PathVariable Long id) {
        ContractResponse response = contractService.getLatestContractByInternProfile(id);
        return ApiResponse.success("Get contract successfully", response);
    }

    @GetMapping("/api/contracts/me")
    public ApiResponse<ContractResponse> getMyContract() {
        ContractResponse response = contractService.getMyLatestContract();
        return ApiResponse.success("Get my contract successfully", response);
    }

    @PatchMapping("/api/contracts/{id}/confirm")
    public ApiResponse<ContractResponse> confirmContract(@PathVariable Long id) {
        ContractResponse response = contractService.confirmContract(id);
        return ApiResponse.success("Confirm contract successfully", response);
    }

    @GetMapping("/api/contracts/{id}/download")
    public ResponseEntity<Resource> downloadContract(@PathVariable Long id) throws MalformedURLException {
        Contract contract = contractService.getContractForDownload(id);
        Path path = Paths.get(contract.getFilePath()).toAbsolutePath().normalize();
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new IllegalArgumentException("Khong tim thay file hop dong");
        }

        String contentType = contract.getContentType() != null
                ? contract.getContentType()
                : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + contract.getOriginalFileName().replace("\"", "") + "\""
                )
                .body(resource);
    }
}
