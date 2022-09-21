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

    private final MemberService memberService;

    @GetMapping("/email")
    public ResponseEntity<MemberEmailResponse> checkEmail(@RequestParam String memberEmail) {
        return ResponseEntity.ok().body(memberService.checkEmail(memberEmail));
    }

    @GetMapping("/nickname")
    public ResponseEntity<MemberNicknameResponse> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok().body(memberService.checkNickname(nickname));
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signUpNormal(@RequestHeader("Authorization") String token, @RequestBody MemberSignUpRequest memberSignUpRequest) {
        memberService.signUpNormal(memberSignUpRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/survey")
    public ResponseEntity<Void> preSurvey(@RequestHeader("Authorization") String token, @RequestBody MemberSurveyRequest memberSurveyRequest) {
        memberService.createPreSurvey(memberSurveyRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/getid")
    public ResponseEntity<MemberEmailResponse> getMemberEmail(@RequestBody MemberGetIdRequest memberGetIdRequest) {
        return ResponseEntity.ok().body(memberService.getMemberEmail(memberGetIdRequest));
    }

    @GetMapping("/info/{memberId}")
    public ResponseEntity<MemberResponse> getMember(@RequestHeader("Authorization") String token, @PathVariable int memberId) {
        return ResponseEntity.ok(memberService.getMemeber(memberId));
    }

    @PatchMapping("/update/{memberId}")
    public ResponseEntity<Void> updateMember(@RequestHeader("Authorization") String token,@PathVariable int memberId, @RequestBody MemberRequest memberRequest) {
        memberService.updateMember(memberId, memberRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/update/password/{memberId}")
    public ResponseEntity<Void> updatePassword(@PathVariable int memberId, @RequestBody MemberUpdatePasswordRequest memberUpdatePasswordRequest) {
        memberService.updatePassword(memberId, memberUpdatePasswordRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/update/mypage/password/{memberId}")
    public ResponseEntity<Void> updateMyPagePassword(@PathVariable int memberId, @RequestBody MemberPasswordRequest memberPasswordRequest) {
        memberService.updateMyPagePassword(memberId, memberPasswordRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/delete/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable int memberId, @RequestParam String deleteMessage) {
        memberService.deleteMember(memberId, deleteMessage);
        return ResponseEntity.ok().build();
    }
}
