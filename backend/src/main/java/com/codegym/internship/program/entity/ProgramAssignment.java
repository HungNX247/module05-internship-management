package com.codegym.internship.program.entity;

import com.codegym.internship.intern.entity.InternProfile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(
        name = "program_assignments",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_program_intern",
                columnNames = {"program_id", "intern_profile_id"}
        )
)
public class ProgramAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false)
    private InternshipProgram program;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "intern_profile_id", nullable = false)
    private InternProfile internProfile;

    @Column(name = "assigned_at")
    private LocalDateTime assignedAt;

    @PrePersist
    public void prePersist() {
        assignedAt = LocalDateTime.now();
    }
}

