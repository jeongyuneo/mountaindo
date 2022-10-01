package com.hanssarang.backend.member.controller.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailAuthRequest {

    private String email;
    private String authToken;
}
