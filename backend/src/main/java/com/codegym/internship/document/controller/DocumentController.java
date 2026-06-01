package com.codegym.internship.document.controller;

import com.codegym.internship.common.response.ApiResponse;
import com.codegym.internship.document.dto.DocumentResponse;
import com.codegym.internship.document.entity.Document;
import com.codegym.internship.document.entity.DocumentType;
import com.codegym.internship.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
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

        return ApiResponse.success("Tải tài liệu lên thành công", response);
    }

    @GetMapping("/api/interns/{id}/documents")
    public ApiResponse<List<DocumentResponse>> getDocumentsByIntern(
            @PathVariable Long id
    ) {
        List<DocumentResponse> response = documentService.getDocumentsByInternProfile(id);

        return ApiResponse.success("Lấy danh sách tài liệu của thực tập sinh thành công", response);
    }

    @GetMapping("/api/documents/{id}/download")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) throws MalformedURLException {
        Document document = documentService.getDocumentForDownload(id);
        Path path = Paths.get(document.getFilePath()).toAbsolutePath().normalize();
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new IllegalArgumentException("Không tìm thấy file tài liệu");
        }

        String contentType = document.getContentType() != null
                ? document.getContentType()
                : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + document.getOriginalFileName().replace("\"", "") + "\""
                )
                .body(resource);
    }
}
