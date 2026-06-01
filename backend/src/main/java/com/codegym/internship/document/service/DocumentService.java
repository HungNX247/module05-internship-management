package com.codegym.internship.document.service;

import com.codegym.internship.document.dto.DocumentResponse;
import com.codegym.internship.document.entity.Document;
import com.codegym.internship.document.entity.DocumentType;
import com.codegym.internship.document.repository.DocumentRepository;
import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.user.entity.User;
import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("pdf", "doc", "docx");

    private final DocumentRepository documentRepository;
    private final InternProfileRepository internProfileRepository;
    private final UserRepository userRepository;

    @Value("${app.upload.document-dir:uploads/documents}")
    private String documentUploadDir;

    @Transactional
    public DocumentResponse uploadDocument(MultipartFile file, DocumentType documentType) {
        User currentUser = getCurrentUser();

        if (!isIntern(currentUser)) {
            throw new AccessDeniedException("Chỉ thực tập sinh mới được tải tài liệu lên");
        }

        InternProfile profile = internProfileRepository.findByUser(currentUser)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ thực tập sinh"));

        validateFile(file);

        String originalFileName = file.getOriginalFilename();
        String extension = getExtension(originalFileName);
        String storedFileName = UUID.randomUUID() + "." + extension;

        try {
            Path profileDir = Paths.get(documentUploadDir, String.valueOf(profile.getId()))
                    .toAbsolutePath()
                    .normalize();

            Files.createDirectories(profileDir);

            Path targetPath = profileDir.resolve(storedFileName);
            file.transferTo(targetPath.toFile());

            Document document = new Document();
            document.setInternProfile(profile);
            document.setDocumentType(documentType);
            document.setOriginalFileName(originalFileName);
            document.setStoredFileName(storedFileName);
            document.setFilePath(targetPath.toString());
            document.setContentType(file.getContentType());
            document.setFileSize(file.getSize());

            Document savedDocument = documentRepository.save(document);

            return DocumentResponse.fromEntity(savedDocument);
        } catch (IOException ex) {
            throw new IllegalArgumentException("Không thể lưu file đã tải lên");
        }
    }

    @Transactional(readOnly = true)
    public List<DocumentResponse> getDocumentsByInternProfile(Long internProfileId) {
        User currentUser = getCurrentUser();

        InternProfile profile = internProfileRepository.findById(internProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ thực tập sinh"));

        if (isIntern(currentUser) && !profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Bạn không có quyền xem các tài liệu này");
        }

        if (!isIntern(currentUser) && !isHr(currentUser) && !isAdmin(currentUser)) {
            throw new AccessDeniedException("Bạn không có quyền xem các tài liệu này");
        }

        return documentRepository.findByInternProfileIdOrderByUploadedAtDesc(internProfileId)
                .stream()
                .map(DocumentResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public Document getDocumentForDownload(Long documentId) {
        User currentUser = getCurrentUser();

        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài liệu"));

        InternProfile profile = document.getInternProfile();

        if (isIntern(currentUser) && !profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Bạn không có quyền tải tài liệu này");
        }

        if (!isIntern(currentUser) && !isHr(currentUser) && !isAdmin(currentUser)) {
            throw new AccessDeniedException("Bạn không có quyền tải tài liệu này");
        }

        return document;
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Vui lòng chọn file");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Dung lượng file không được vượt quá 5MB");
        }

        String extension = getExtension(file.getOriginalFilename());

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Chỉ cho phép file PDF, DOC, DOCX");
        }
    }

    private String getExtension(String fileName) {
        if (fileName == null || fileName.isBlank() || !fileName.contains(".")) {
            throw new IllegalArgumentException("Tên file không hợp lệ");
        }

        return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new AccessDeniedException("Người dùng chưa đăng nhập");
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng hiện tại"));
    }

    private boolean isIntern(User user) {
        return user.getRole().getCode() == Role.INTERN;
    }

    private boolean isHr(User user) {
        return user.getRole().getCode() == Role.HR;
    }

    private boolean isAdmin(User user) {
        return user.getRole().getCode() == Role.ADMIN;
    }
}

