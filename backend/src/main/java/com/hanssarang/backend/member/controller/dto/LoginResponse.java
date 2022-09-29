package com.hanssarang.backend.member.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginResponse {

    private int memberId;
    private String nickname;
    private String imageUrl;
    private boolean isCompletedSurvey;
    private String token;
}
