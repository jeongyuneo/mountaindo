package com.hanssarang.backend.member.service;

import com.hanssarang.backend.member.controller.dto.*;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    public void checkEmail(String email) {
    }

    public void checkNickname(String nickname) {
    }

    public void signUp(SignUpRequest signUpRequest) {
    }

    public void createInitialSurvey(InitialSurveyRequest initialSurveyRequest) {
    }

    public EmailResponse getMemberEmail(FindingEmailRequest findingEmailRequest) {
        return null;
    }

    public MemberResponse getMember(int memberId) {
        return null;
    }

    public void updateMember(int memberId, MemberRequest memberRequest) {
    }

    @Transactional
    public void updatePassword(PasswordUpdateVerificationRequest memberPasswordUpdateVerificationRequest) {
        Member member = memberRepository.findByEmailAndName(memberPasswordUpdateVerificationRequest.getEmail(), memberPasswordUpdateVerificationRequest.getName())
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        String newPassword = createPassword();
        member.updatePassword(passwordEncoder, newPassword);
        // 이메일 전송
    }

    public void updatePasswordInMyPage(int memberId, PasswordUpdateRequest passwordUpdateRequest) {
    }

    public void deleteMember(int memberId) {
    }

    public void login(LoginRequest loginRequest) {
    }
}
