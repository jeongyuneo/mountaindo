package com.hanssarang.backend.member.controller;

import com.hanssarang.backend.member.controller.dto.*;
import com.hanssarang.backend.member.service.MemberService;
import com.hanssarang.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private static final String AUTHORIZATION = "Authorization";

    private final MemberService memberService;

    @GetMapping("/email")
    public ResponseEntity<Void> checkEmail(@RequestParam String email) {
        memberService.checkEmail(email);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/nickname")
    public ResponseEntity<Void> checkNickname(@RequestParam String nickname) {
        memberService.checkNickname(nickname);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok()
                .body(memberService.signUp(signUpRequest));
    }

    @PostMapping("/initial-survey")
    public ResponseEntity<Void> createInitialSurvey(@RequestHeader(AUTHORIZATION) String token, @RequestBody InitialSurveyRequest initialSurveyRequest) {
        memberService.createInitialSurvey(JwtUtil.getMemberId(token), initialSurveyRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email")
    public ResponseEntity<EmailResponse> getMemberEmail(@RequestBody FindingEmailRequest findingEmailRequest) {
        return ResponseEntity.ok().body(memberService.getMemberEmail(findingEmailRequest));
    }

    @GetMapping
    public ResponseEntity<MemberResponse> getMember(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.ok(memberService.getMember(JwtUtil.getMemberId(token)));
    }

    @PatchMapping
    public ResponseEntity<UpdateResponse> updateMember(@RequestHeader(AUTHORIZATION) String token, @RequestBody UpdateRequest updateRequest) {
        return ResponseEntity.ok().body(memberService.updateMember(JwtUtil.getMemberId(token), updateRequest));
    }

    @PatchMapping("/password")
    public ResponseEntity<Void> updatePassword(@RequestBody PasswordUpdateVerificationRequest passwordUpdateVerificationRequest) {
        memberService.updatePassword(passwordUpdateVerificationRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/mypage/password")
    public ResponseEntity<Void> updatePasswordInMyPage(@RequestHeader(AUTHORIZATION) String token, @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        memberService.updatePasswordInMyPage(JwtUtil.getMemberId(token), passwordUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember(@RequestHeader(AUTHORIZATION) String token) {
        memberService.deleteMember(JwtUtil.getMemberId(token));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok()
                .body(memberService.login(loginRequest));
    }

    @PostMapping("/email/1")
    public ResponseEntity<Void> sendEmailValidationToken(@RequestParam String email) {
        memberService.sendEmailValidationToken(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email/2")
    public ResponseEntity<Void> validateSignUpEmail(@RequestBody EmailAuthRequest emailAuthRequest) {
        memberService.validateSignUpEmail(emailAuthRequest);
        return ResponseEntity.ok().build();
    }
}
