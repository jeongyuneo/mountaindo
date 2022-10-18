package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendationResponse {

    private int mountainId;
    private String mountainName;
    private String mountainImage;
    private String trailName;
}
