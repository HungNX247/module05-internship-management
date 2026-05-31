package com.codegym.internship.document.dto;

import com.codegym.internship.document.entity.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DocumentResponse {

    private Long id;
    private Long internProfileId;
    private String documentType;
    private String originalFileName;
    private String storedFileName;
    private String filePath;
    private String contentType;
    private Long fileSize;
    private LocalDateTime uploadedAt;

    public static DocumentResponse fromEntity(Document document) {
        return new DocumentResponse(
                document.getId(),
                document.getInternProfile().getId(),
                document.getDocumentType().name(),
                document.getOriginalFileName(),
                document.getStoredFileName(),
                document.getFilePath(),
                document.getContentType(),
                document.getFileSize(),
                document.getUploadedAt()
        );
    }
}
