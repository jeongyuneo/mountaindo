package com.hanssarang.backend.member.controller;

import com.hanssarang.backend.member.controller.dto.*;
import com.hanssarang.backend.member.service.MemberService;
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

    @PostMapping()
    public ResponseEntity<Void> signUp(@RequestHeader(AUTHORIZATION) String token, @RequestBody SignUpRequest signUpRequest) {
        memberService.signUp(signUpRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/initial-survey")
    public ResponseEntity<Void> createInitialSurvey(@RequestHeader(AUTHORIZATION) String token, @RequestBody InitialSurveyRequest initialSurveyRequest) {
        memberService.createInitialSurvey(initialSurveyRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email")
    public ResponseEntity<EmailResponse> getMemberEmail(@RequestBody FindingEmailRequest findingEmailRequest) {
        return ResponseEntity.ok().body(memberService.getMemberEmail(findingEmailRequest));
    }

    @GetMapping()
    public ResponseEntity<MemberResponse> getMember(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.ok(memberService.getMember(1));
    }

    @PatchMapping()
    public ResponseEntity<UpdateResponse> updateMember(@RequestHeader(AUTHORIZATION) String token, @RequestBody UpdateRequest updateRequest) {
        return ResponseEntity.ok().body(memberService.updateMember(1, updateRequest));
    }

    @PatchMapping("/password")
    public ResponseEntity<Void> updatePassword(@RequestBody PasswordUpdateVerificationRequest passwordUpdateVerificationRequest) {
        memberService.updatePassword(1, passwordUpdateVerificationRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/mypage/password")
    public ResponseEntity<Void> updatePasswordInMyPage(@RequestHeader(AUTHORIZATION) String token, @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        memberService.updatePasswordInMyPage(1, passwordUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteMember(@RequestHeader(AUTHORIZATION) String token) {
        memberService.deleteMember(1);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok()
                .body(memberService.login(loginRequest));
    }
}
