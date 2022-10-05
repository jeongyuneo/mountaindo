package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendationResponse {

    private String trailName;
    private String mountainName;
    private byte[] mountainImage;
}
