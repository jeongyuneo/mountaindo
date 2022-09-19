package com.hanssarang.backend.member.controller;

import com.hanssarang.backend.member.controller.dto.MemberEmailResponse;
import com.hanssarang.backend.member.controller.dto.MemberSignUpRequest;
import com.hanssarang.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping()
    public ResponseEntity<MemberEmailResponse> checkEmail(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok().body(memberService.checkEmail("ssafy"));
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signUpNormal(@RequestHeader("Authorization") String token, @RequestBody MemberSignUpRequest memberSignUpRequest) {
        memberService.signUpNormal(memberSignUpRequest);
        return ResponseEntity.ok().build();
    }
//    @PostMapping("/signup/normal")
//    public ResponseEntity<?> signUpNormal(@Valid @RequestBody Member member) throws Exception {
//        return null;
//    }
}
