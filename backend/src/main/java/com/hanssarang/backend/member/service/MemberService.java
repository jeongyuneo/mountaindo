package com.hanssarang.backend.member.service;

import com.hanssarang.backend.member.controller.dto.MemberEmailResponse;
import com.hanssarang.backend.member.controller.dto.MemberSignUpRequest;
import com.hanssarang.backend.member.controller.dto.MemberSurveyRequest;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    public MemberEmailResponse checkEmail(String memberEmail) {
        return null;
    }

    public void signUpNormal(MemberSignUpRequest memberSignUpRequest) {

    }

    public void preSurvey(MemberSurveyRequest memberSurveyRequest) {

    }
}
