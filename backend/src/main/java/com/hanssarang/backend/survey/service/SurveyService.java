package com.hanssarang.backend.survey.service;

import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.survey.controller.dto.CreateSurveyRequest;
import com.hanssarang.backend.survey.domain.Survey;
import com.hanssarang.backend.survey.domain.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_MEMBER;

@RequiredArgsConstructor
@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final MemberRepository memberRepository;

    public void createSurvey(int memberId, CreateSurveyRequest createSurveyRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        Survey survey = Survey.builder()
                .level(createSurveyRequest.getLevel())
                .preferredMountainLocation(createSurveyRequest.getPreferredMountainLocation())
                .preferredHikingStyle(createSurveyRequest.getPreferredHikingStyle())
                .preferredHikingTime(createSurveyRequest.getPreferredHikingTime())
                .isActive(true)
                .member(member)
                .build();
        surveyRepository.save(survey);
    }
}
