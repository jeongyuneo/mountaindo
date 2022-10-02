package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HikingListResponse {

    private int hikingId;
    private String trailName;
    private LocalDate lastHikingDate;
    private LocalTime useTime;
    private String level;
    private String mountainName;
}
