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

    public void updateMember(MemberRequest memberRequest) {
    }

    public void updatePassword(PasswordUpdateVerificationRequest memberPasswordUpdateVerificationRequest) {
    }

    public void updatePasswordInMyPage(PasswordUpdateRequest passwordUpdateRequest) {
    }

    public void deleteMember(int memberId) {
    }

    public void login(LoginRequest loginRequest) {
    }
}
