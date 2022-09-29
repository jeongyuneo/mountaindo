package com.hanssarang.backend.survey.controller;

import com.hanssarang.backend.member.controller.dto.FindingEmailRequest;
import com.hanssarang.backend.member.service.MemberService;
import com.hanssarang.backend.survey.controller.dto.SaveSurveyRequest;
import com.hanssarang.backend.survey.service.SurveyService;
import com.hanssarang.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/survey")
public class SurveyController {

    private final SurveyService surveyService;

    @PostMapping
    public ResponseEntity<Void> createSurvey(@RequestHeader("Authorization") String token, @RequestBody SaveSurveyRequest saveSurveyRequest) {
        surveyService.createSurvey(JwtUtil.getMemberId(token), saveSurveyRequest);
        return ResponseEntity.ok().build();
    }
}
