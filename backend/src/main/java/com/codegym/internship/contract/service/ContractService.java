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
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContractService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;
    private static final List<String> ALLOWED_EXTENSIONS = List.of("pdf", "doc", "docx");
    private static final Path CONTRACT_ROOT = Paths.get("uploads", "contracts");

    private final ContractRepository contractRepository;
    private final InternProfileRepository internProfileRepository;
    private final UserRepository userRepository;

    @Transactional
    public ContractResponse uploadContract(Long internProfileId, MultipartFile file) {
        User currentUser = getCurrentUser();

        if (!isHr(currentUser) && !isAdmin(currentUser)) {
            throw new AccessDeniedException("Only HR or ADMIN can upload contract");
        }

        InternProfile profile = internProfileRepository.findById(internProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ"));

        if (profile.getStatus() != InternProfileStatus.APPROVED) {
            throw new IllegalArgumentException("Chỉ hồ sơ đã được duyệt mới được upload hợp đồng");
        }

        validateFile(file);

        try {
            String extension = getExtension(file.getOriginalFilename());
            String storedFileName = UUID.randomUUID() + "." + extension;
            Path profileDir = CONTRACT_ROOT.resolve(String.valueOf(profile.getId()));
            Files.createDirectories(profileDir);

            Path targetPath = profileDir.resolve(storedFileName).toAbsolutePath();
            file.transferTo(targetPath.toFile());

            Contract contract = new Contract();
            contract.setInternProfile(profile);
            contract.setOriginalFileName(file.getOriginalFilename());
            contract.setStoredFileName(storedFileName);
            contract.setFilePath(targetPath.toString());
            contract.setContentType(file.getContentType());
            contract.setFileSize(file.getSize());
            contract.setStatus(ContractStatus.UPLOADED);

            Contract savedContract = contractRepository.save(contract);
            return ContractResponse.fromEntity(savedContract);
        } catch (IOException e) {
            throw new IllegalArgumentException("Upload hợp đồng thất bại");
        }
    }

    @Transactional(readOnly = true)
    public ContractResponse getLatestContractByInternProfile(Long internProfileId) {
        User currentUser = getCurrentUser();

        InternProfile profile = internProfileRepository.findById(internProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ"));

        checkCanViewContract(currentUser, profile);

        Contract contract = contractRepository.findTopByInternProfileIdOrderByUploadedAtDesc(internProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Hồ sơ chưa có hợp đồng"));

        return ContractResponse.fromEntity(contract);
    }

    @Transactional
    public ContractResponse confirmContract(Long contractId) {
        User currentUser = getCurrentUser();

        if (!isIntern(currentUser)) {
            throw new AccessDeniedException("Only INTERN can confirm contract");
        }

        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hợp đồng"));

        InternProfile profile = contract.getInternProfile();
        if (!profile.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Bạn không có quyền xác nhận hợp đồng này");
        }

        if (contract.getStatus() != ContractStatus.UPLOADED) {
            throw new IllegalArgumentException("Chỉ hợp đồng mới upload mới được xác nhận");
        }

        contract.setStatus(ContractStatus.CONFIRMED);
        contract.setConfirmedAt(LocalDateTime.now());

        Contract savedContract = contractRepository.save(contract);
        return ContractResponse.fromEntity(savedContract);
    }

    @Transactional(readOnly = true)
    public Resource downloadContract(Long contractId) {
        User currentUser = getCurrentUser();

        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hợp đồng"));

        checkCanViewContract(currentUser, contract.getInternProfile());

        try {
            Path filePath = Paths.get(contract.getFilePath()).toAbsolutePath().normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                throw new IllegalArgumentException("Không đọc được file hợp đồng");
            }

            return resource;
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("Đường dẫn file hợp đồng không hợp lệ");
        }
    }

    public String getOriginalFileName(Long contractId) {
        return contractRepository.findById(contractId)
                .map(Contract::getOriginalFileName)
                .orElse("contract");
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Vui lòng chọn file hợp đồng");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File hợp đồng vượt quá dung lượng 5MB");
        }

        String extension = getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Chỉ cho phép upload PDF, DOC, DOCX");
        }
    }

    private String getExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return "";
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

        throw new AccessDeniedException("Bạn không có quyền xem hợp đồng này");
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new AccessDeniedException("User is not authenticated");
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