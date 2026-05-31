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
    private String fileName; // For frontend compatibility

//    private String storedFileName; // --- Sửa lỗi không trả về toredFile
//    private String filePath;  // --- Sửa lỗi không trả về filePath

    private String contentType;
    private String fileType; // For frontend compatibility
    private Long fileSize;
    private Long size; // For frontend compatibility
    private LocalDateTime uploadedAt;

    public static DocumentResponse fromEntity(Document document) {
        return new DocumentResponse(
                document.getId(),
                document.getInternProfile().getId(),
                document.getDocumentType().name(),
                document.getOriginalFileName(),
                document.getOriginalFileName(),

//                document.getStoredFileName(), // --- Sửa lỗi không trả về toredFile
//                document.getFilePath(), // --- Sửa lỗi không trả về FilePath

                document.getContentType(),
                document.getContentType(),
                document.getFileSize(),
                document.getFileSize(),
                document.getUploadedAt()
        );
    }
}
