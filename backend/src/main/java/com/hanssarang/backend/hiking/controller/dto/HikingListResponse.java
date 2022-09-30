package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HikingListResponse {

    private String mountainName;
    private String address;
    private LocalDate lastHikingDate;
    private String lastHikingTrailName;
}
