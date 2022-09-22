package com.hanssarang.backend.member.service;

import com.hanssarang.backend.member.controller.dto.*;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    public void checkEmail(String memberEmail) {
    }

    public void checkNickname(String nickname) {
    }

    public void signUp(SignUpRequest signUpRequest) {
    }

    public void createInitialSurvey(SurveyRequest surveyRequest) {
    }

    public EmailResponse getMemberEmail(FindingIdRequest findingIdRequest) {
        return null;
    }

    public MemberResponse getMember() {
        return null;
    }

    public void updateMember(int memberId, MemberRequest memberRequest) {
    }

    public void updatePassword(int memberId, UpdatePasswordRequest memberUpdatePasswordRequest) {
    }

    public void updatePasswordInMyPage(int memberId, PasswordRequest passwordRequest) {
    }

    public void deleteMember() {
    }

    public void login(LoginRequest loginRequest) {
    }
}
