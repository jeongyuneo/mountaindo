package com.hanssarang.backend.member.service;

import com.hanssarang.backend.member.controller.dto.*;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    public MemberEmailResponse checkEmail(String memberEmail) {
        return null;
    }

    public MemberNicknameResponse checkNickname(String nickname) {
        return null;
    }

    public void signUpNormal(MemberSignUpRequest memberSignUpRequest) {

    }

    public void createPreSurvey(MemberSurveyRequest memberSurveyRequest) {

    }

    public MemberEmailResponse getMemberEmail(MemberGetIdRequest memberGetIdRequest) {
        return null;
    }

    public MemberResponse getMemeber(int memberId) {
        return null;
    }

    public void updateMember(int memberId, MemberRequest memberRequest) {
    }

    public void updatePassword(int memberId, MemberUpdatePasswordRequest memberUpdatePasswordRequest) {
    }

    public void updateMyPagePassword(int memberId, MemberPasswordRequest memberPasswordRequest) {
    }

    public void deleteMember(int memberId, String deleteMessage) {
    }

    public MemberLoginResponse getMemberLogin(MemberLoginRequest memberLoginRequest) {
        return null;
    }
}
