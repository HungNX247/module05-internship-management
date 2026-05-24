package com.codegym.internship.document.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.document.dto.DocumentResponse;
import com.codegym.internship.document.entity.DocumentType;
import com.codegym.internship.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/api/documents/upload")
    public ApiResponse<DocumentResponse> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") DocumentType documentType
    ) {
        DocumentResponse response = documentService.uploadDocument(file, documentType);

        return ApiResponse.success("Upload document successfully", response);
    }

    @GetMapping("/api/interns/{id}/documents")
    public ApiResponse<List<DocumentResponse>> getDocumentsByIntern(
            @PathVariable Long id
    ) {
        List<DocumentResponse> response = documentService.getDocumentsByInternProfile(id);

        return ApiResponse.success("Get intern documents successfully", response);
    }
}
