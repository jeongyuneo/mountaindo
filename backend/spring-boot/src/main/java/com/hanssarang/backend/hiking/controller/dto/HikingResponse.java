package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

import java.time.LocalTime;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HikingResponse {

    private String mountainName;
    private String address;
    private String trailName;
    private double distance;
    private LocalTime useTime;
    private double accumulatedHeight;
    private String imageUrl;
}
