package com.hanssarang.backend.member.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberSurveyRequest {

    private String myLevel;
    private String visitedMountain;
    private String mountainLocation;
    private String mountainStyle;
    private String climbingTime;
}
