package com.codegym.internship.auth.service;

import com.codegym.internship.auth.dto.CurrentUserResponse;
import com.codegym.internship.auth.dto.LoginRequest;
import com.codegym.internship.auth.dto.LoginResponse;
import com.codegym.internship.security.JwtService;
import com.codegym.internship.user.entity.User;
import com.codegym.internship.user.enums.UserStatus;
import com.codegym.internship.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Email hoặc mật khẩu không đúng"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new DisabledException("Tài khoản đã bị khóa");
        }

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPasswordHash());
        if (!passwordMatches) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }

        String token = jwtService.generateToken(user);
        return new LoginResponse(token, toCurrentUserResponse(user));
    }

    public CurrentUserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Không tìm thấy người dùng"));
        return toCurrentUserResponse(user);
    }

    private CurrentUserResponse toCurrentUserResponse(User user) {
        return new CurrentUserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().getCode(),
                user.getStatus()
        );
    }
}
