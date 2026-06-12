package com.codegym.internship.contract.service;

import com.codegym.internship.contract.dto.ContractResponse;
import com.codegym.internship.contract.entity.Contract;
import com.codegym.internship.contract.entity.ContractStatus;
import com.codegym.internship.contract.repository.ContractRepository;
import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.entity.InternProfileStatus;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.user.entity.User;
import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.repository.UserRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ContractService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("pdf", "doc", "docx");

    private final ContractRepository contractRepository;
    private final InternProfileRepository internProfileRepository;
    private final UserRepository userRepository;

    @Value("${app.upload.contract-dir:uploads/contracts}")
    private String contractUploadDir;

    @Transactional
    public ContractResponse uploadContract(Long internProfileId, MultipartFile file) {
        User currentUser = getCurrentUser();

        if (!isHr(currentUser) && !isAdmin(currentUser)) {
            throw new AccessDeniedException("Only HR or ADMIN can upload contract");
        }

        InternProfile profile = internProfileRepository.findById(internProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Khong tim thay ho so"));

        if (profile.getStatus() != InternProfileStatus.APPROVED) {
            throw new IllegalArgumentException("Chi ho so da duoc duyet moi duoc upload hop dong");
        }

        validateFile(file);

        String originalFileName = file.getOriginalFilename();
        String extension = getExtension(originalFileName);
        String storedFileName = UUID.randomUUID() + "." + extension;

        try {
            Path profileDir = Paths.get(contractUploadDir, String.valueOf(profile.getId()))
                    .toAbsolutePath()
                    .normalize();

            Files.createDirectories(profileDir);

            Path targetPath = profileDir.resolve(storedFileName).normalize();
            file.transferTo(targetPath.toFile());

            Contract contract = new Contract();
            contract.setInternProfile(profile);
            contract.setOriginalFileName(originalFileName);
            contract.setStoredFileName(storedFileName);
            contract.setFilePath(targetPath.toString());
            contract.setContentType(file.getContentType());
            contract.setFileSize(file.getSize());
            contract.setStatus(ContractStatus.UPLOADED);

            Contract savedContract = contractRepository.save(contract);
            return ContractResponse.fromEntity(savedContract);
        } catch (IOException ex) {
            throw new IllegalArgumentException("Upload hop dong that bai");
        }
    }

    @Transactional(readOnly = true)
    public ContractResponse getLatestContractByInternProfile(Long internProfileId) {
        User currentUser = getCurrentUser();
        InternProfile profile = internProfileRepository.findById(internProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Khong tim thay ho so"));

        checkCanViewContract(currentUser, profile);

        Contract contract = contractRepository.findTopByInternProfileIdOrderByUploadedAtDesc(internProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Ho so chua co hop dong"));

        return ContractResponse.fromEntity(contract);
    }

    @Transactional(readOnly = true)
    public ContractResponse getMyLatestContract() {
        User currentUser = getCurrentUser();

        if (!isIntern(currentUser)) {
            throw new AccessDeniedException("Only INTERN can view own contract");
        }

        InternProfile profile = internProfileRepository.findByUser(currentUser)
                .orElseThrow(() -> new IllegalArgumentException("Khong tim thay ho so"));

        Contract contract = contractRepository.findTopByInternProfileIdOrderByUploadedAtDesc(profile.getId())
                .orElseThrow(() -> new IllegalArgumentException("Ho so chua co hop dong"));

        return ContractResponse.fromEntity(contract);
    }

    @Transactional
    public ContractResponse confirmContract(Long contractId) {
        User currentUser = getCurrentUser();

        if (!isIntern(currentUser)) {
            throw new AccessDeniedException("Only INTERN can confirm contract");
        }

        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new IllegalArgumentException("Khong tim thay hop dong"));

        InternProfile profile = contract.getInternProfile();
        if (!profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Ban khong co quyen xac nhan hop dong nay");
        }

        if (contract.getStatus() != ContractStatus.UPLOADED) {
            throw new IllegalArgumentException("Chi hop dong moi upload moi duoc xac nhan");
        }

        contract.setStatus(ContractStatus.CONFIRMED);
        contract.setConfirmedAt(LocalDateTime.now());

        Contract savedContract = contractRepository.save(contract);
        return ContractResponse.fromEntity(savedContract);
    }

    @Transactional(readOnly = true)
    public Contract getContractForDownload(Long contractId) {
        User currentUser = getCurrentUser();
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new IllegalArgumentException("Khong tim thay hop dong"));

        checkCanViewContract(currentUser, contract.getInternProfile());
        return contract;
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Vui long chon file hop dong");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Dung luong file khong duoc vuot qua 5MB");
        }

        String extension = getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Chi cho phep file PDF, DOC, DOCX");
        }
    }

    private String getExtension(String fileName) {
        if (fileName == null || fileName.isBlank() || !fileName.contains(".")) {
            throw new IllegalArgumentException("Ten file khong hop le");
        }

        return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }

    private void checkCanViewContract(User user, InternProfile profile) {
        if (isHr(user) || isAdmin(user)) {
            return;
        }

        if (isIntern(user) && profile.getUser().getId().equals(user.getId())) {
            return;
        }

        throw new AccessDeniedException("Ban khong co quyen xem hop dong nay");
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new AccessDeniedException("User is not authenticated");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Khong tim thay nguoi dung hien tai"));
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
