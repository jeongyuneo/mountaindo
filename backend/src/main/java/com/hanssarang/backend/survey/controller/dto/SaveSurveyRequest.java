package com.hanssarang.backend.survey.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SaveSurveyRequest {

    private int level;
    private int preferredMountainLocation;
    private int preferredHikingStyle;
    private int preferredHikingTime;
}
