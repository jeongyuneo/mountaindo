package com.hanssarang.backend.survey.service;

import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.survey.controller.dto.SaveSurveyRequest;
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

    public void saveSurvey(int memberId, SaveSurveyRequest saveSurveyRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        Survey survey = Survey.builder()
                .level(saveSurveyRequest.getLevel())
                .preferredMountainLocation(saveSurveyRequest.getPreferredMountainLocation())
                .preferredHikingStyle(saveSurveyRequest.getPreferredHikingStyle())
                .preferredHikingTime(saveSurveyRequest.getPreferredHikingTime())
                .member(member)
                .build();
        surveyRepository.save(survey);
    }
}
