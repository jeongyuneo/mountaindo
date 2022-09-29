package com.hanssarang.backend.survey.controller;

import com.hanssarang.backend.member.service.MemberService;
import com.hanssarang.backend.survey.controller.dto.CreateSurveyRequest;
import com.hanssarang.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/surveys")
public class SurveyController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Void> createSurvey(@RequestHeader("Authorization") String token, @RequestBody CreateSurveyRequest createSurveyRequest) {
        memberService.createSurvey(JwtUtil.getMemberId(token), createSurveyRequest);
        return ResponseEntity.ok().build();
    }
}
