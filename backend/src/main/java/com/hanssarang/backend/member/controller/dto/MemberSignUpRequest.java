package com.hanssarang.backend.member.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberSignUpRequest {

    private String email;
    private String password;
    private String name;
    private String birth;
    private String phoneNumber;
    private String address;
    private String nickName;
}
