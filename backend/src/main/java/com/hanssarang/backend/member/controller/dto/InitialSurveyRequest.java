package com.hanssarang.backend.member.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InitialSurveyRequest {

    private String myLevel;
    private String visitedMountain;
    private String preferredMountainLocation;
    private String preferredMountainStyle;
    private String preferredClimbingTime;
}
