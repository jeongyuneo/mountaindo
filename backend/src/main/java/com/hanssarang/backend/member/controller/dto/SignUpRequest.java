package com.hanssarang.backend.member.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SignUpRequest {

    private String email;
    private String password;
    private String name;
    private String birth;
    private String phone;
    private String address;
    private String nickname;
}
