package com.codegym.internship.mentor.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.codegym.internship.department.repository.DepartmentRepository;
import com.codegym.internship.intern.entity.InternProfile;
import com.codegym.internship.intern.entity.InternProfileStatus;
import com.codegym.internship.intern.repository.InternProfileRepository;
import com.codegym.internship.mentor.dto.MentorAssignmentRequest;
import com.codegym.internship.mentor.dto.MentorResponse;
import com.codegym.internship.mentor.entity.Mentor;
import com.codegym.internship.mentor.entity.MentorStatus;
import com.codegym.internship.mentor.repository.MentorRepository;
import com.codegym.internship.user.entity.User;
import com.codegym.internship.user.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MentorServiceTest {

    @Mock
    private MentorRepository mentorRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private InternProfileRepository internProfileRepository;

    @InjectMocks
    private MentorService mentorService;

    @Test
    void assignMentorToInternAllowsChangingExistingMentor() {
        Mentor oldMentor = mentor(1L, "Old Mentor");
        Mentor newMentor = mentor(2L, "New Mentor");

        InternProfile profile = new InternProfile();
        profile.setId(10L);
        profile.setStatus(InternProfileStatus.APPROVED);
        profile.setMentor(oldMentor);

        MentorAssignmentRequest request = new MentorAssignmentRequest();
        request.setMentorId(newMentor.getId());

        when(internProfileRepository.findById(profile.getId())).thenReturn(Optional.of(profile));
        when(mentorRepository.findById(newMentor.getId())).thenReturn(Optional.of(newMentor));
        when(internProfileRepository.countByMentorId(newMentor.getId())).thenReturn(1L);

        MentorResponse response = mentorService.assignMentorToIntern(profile.getId(), request);

        assertSame(newMentor, profile.getMentor());
        assertEquals(newMentor.getId(), response.getId());
        verify(internProfileRepository).save(profile);
    }

    private Mentor mentor(Long id, String fullName) {
        User user = new User();
        user.setId(id);
        user.setFullName(fullName);
        user.setEmail("mentor" + id + "@example.com");

        Mentor mentor = new Mentor();
        mentor.setId(id);
        mentor.setUser(user);
        mentor.setFullName(fullName);
        mentor.setMaxInterns(3);
        mentor.setStatus(MentorStatus.ACTIVE);
        return mentor;
    }
}
