package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

import java.time.LocalTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HikingRequest {

    private int trailId;
    private List<PathResponse> path;
    private PathResponse endPoint;
    private double accumulatedHeight;
    private double distance;
    private LocalTime useTime;
}
