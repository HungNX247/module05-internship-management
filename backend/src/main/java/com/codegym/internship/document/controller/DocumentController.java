package com.codegym.internship.document.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.document.dto.DocumentResponse;
import com.codegym.internship.document.entity.Document;
import com.codegym.internship.document.entity.DocumentType;
import com.codegym.internship.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
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

    @GetMapping("/api/documents/{id}/download")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) {
        Document document = documentService.downloadDocument(id);
        Path filePath = Paths.get(document.getFilePath());
        Resource resource = new FileSystemResource(filePath);

        String contentType = document.getContentType();
        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getOriginalFileName() + "\"")
                .body(resource);
    }
}
