package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HikingResponse {

    private String mountainName;
    private String address;
    private int height;
    private String trailName;
    private String level;
    private List<PathResponse> path;
}
