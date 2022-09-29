package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrailListResponse {

    private int trailId;
    private String name;
    private double length;
    private String level;
    private String imageUrl;
}
