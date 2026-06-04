package com.codegym.internship.notification.service;

import com.codegym.internship.intern.entity.InternProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.enabled:false}")
    private boolean mailEnabled;

    @Value("${app.mail.from:no-reply@module05.local}")
    private String from;

    public void sendApprovalEmail(InternProfile profile) {
        String subject = "Thông báo hồ sơ thực tập đã được duyệt";
        String body = "Xin chào " + profile.getFullName() + ",\n\n"
                + "Hồ sơ thực tập của bạn đã được HR duyệt. "
                + "Vui lòng đăng nhập hệ thống để theo dõi bước hợp đồng.\n\n"
                + "Trân trọng,\nModule05 Internship Management";

        send(profile.getEmail(), subject, body);
    }

    public void sendRejectEmail(InternProfile profile, String rejectReason) {
        String subject = "Thông báo hồ sơ thực tập bị từ chối";
        String body = "Xin chào " + profile.getFullName() + ",\n\n"
                + "Hồ sơ thực tập của bạn đã bị HR từ chối.\n"
                + "Lý do: " + rejectReason + "\n\n"
                + "Bạn có thể chỉnh sửa hồ sơ cũ và nộp lại trên hệ thống.\n\n"
                + "Trân trọng,\nModule05 Internship Management";

        send(profile.getEmail(), subject, body);
    }

    private void send(String to, String subject, String body) {
        if (!mailEnabled) {
            log.info("[MAIL DISABLED] To: {}, Subject: {}, Body: {}", to, subject, body);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
