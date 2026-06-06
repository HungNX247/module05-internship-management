package com.codegym.internship.config;

import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.entity.InternProfileStatus;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.user.entity.RoleEntity;
import com.codegym.internship.user.entity.User;
import com.codegym.internship.user.enums.Role;
import com.codegym.internship.user.enums.UserStatus;
import com.codegym.internship.user.repository.RoleRepository;
import com.codegym.internship.user.repository.UserRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final InternProfileRepository internProfileRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedDefaultUsers() {
        return args -> {
            RoleEntity adminRole = createRoleIfMissing(Role.ADMIN, "Administrator", "System administrator");
            RoleEntity hrRole = createRoleIfMissing(Role.HR, "Human Resources", "HR management role");
            RoleEntity mentorRole = createRoleIfMissing(Role.MENTOR, "Mentor", "Mentor role");
            RoleEntity internRole = createRoleIfMissing(Role.INTERN, "Intern", "Intern role");

            createUserIfMissing("admin@gmail.com", "Admin User", "0900000001", "123456", adminRole);
            createUserIfMissing("hr@gmail.com", "HR User", "0900000002", "123456", hrRole);
            createUserIfMissing("mentor@gmail.com", "Mentor User", "0900000003", "123456", mentorRole);
            createUserIfMissing("intern@gmail.com", "Intern User", "0900000004", "123456", internRole);

            createInternWithPendingProfile(internRole);
        };
    }

    private void createInternWithPendingProfile(RoleEntity internRole) {
        String email = "nguyen.van.an@gmail.com";
        if (userRepository.existsByEmail(email)) {
            return;
        }

        User user = new User();
        user.setEmail(email);
        user.setFullName("Nguyễn Văn An");
        user.setPhone("0901111001");
        user.setPasswordHash(passwordEncoder.encode("123456"));
        user.setRole(internRole);
        user.setStatus(UserStatus.ACTIVE);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);

        InternProfile profile = new InternProfile();
        profile.setUser(savedUser);
        profile.setFullName("Nguyễn Văn An");
        profile.setEmail(email);
        profile.setPhone("0901111001");
        profile.setSchool("Đại học Bách Khoa Hà Nội");
        profile.setMajor("Công nghệ Thông tin");
        profile.setAcademicYear("2021-2025");
        profile.setGpa(new BigDecimal("3.50"));
        profile.setStatus(InternProfileStatus.PENDING);
        internProfileRepository.save(profile);
    }

    private RoleEntity createRoleIfMissing(Role code, String name, String description) {
        return roleRepository.findByCode(code).orElseGet(() -> {
            RoleEntity role = new RoleEntity();
            role.setCode(code);
            role.setName(name);
            role.setDescription(description);
            role.setCreatedAt(LocalDateTime.now());
            role.setUpdatedAt(LocalDateTime.now());
            return roleRepository.save(role);
        });
    }

    private void createUserIfMissing(String email, String fullName, String phone, String rawPassword, RoleEntity role) {
        if (userRepository.existsByEmail(email)) {
            return;
        }

        User user = new User();
        user.setEmail(email);
        user.setFullName(fullName);
        user.setPhone(phone);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        user.setRole(role);
        user.setStatus(UserStatus.ACTIVE);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }
}
