package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendationListResponse {

    private List<RecommendationResponse> memberBased;
    private List<RecommendationResponse> lastVisitedTrailBased;
    private List<RecommendationResponse> surveyBased;
}
