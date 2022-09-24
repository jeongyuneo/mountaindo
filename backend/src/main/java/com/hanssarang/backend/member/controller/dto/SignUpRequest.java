package com.hanssarang.backend.member.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SignUpRequest {

    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private String phone;
    private String address;
    private String nickname;
}
