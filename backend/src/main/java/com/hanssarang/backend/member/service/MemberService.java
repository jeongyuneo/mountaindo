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

    public UpdateResponse updateMember(int memberId, UpdateRequest updateRequest) {
        return null;
    }

    public void updatePassword(int memberId, PasswordUpdateVerificationRequest memberPasswordUpdateVerificationRequest) {
    }

    public void updatePasswordInMyPage(int memberId, PasswordUpdateRequest passwordUpdateRequest) {
    }

    public void deleteMember(int memberId) {
    }

    public LoginResponse login(LoginRequest loginRequest) {
        return null;
    }
}
