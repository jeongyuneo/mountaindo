package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HikingRequest {

    private List<HikingPath> path;
    private HikingPath endPoint;
    private double accumulatedHeight;
    private String useTime;
}
