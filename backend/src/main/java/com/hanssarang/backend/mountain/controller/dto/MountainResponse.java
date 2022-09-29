package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MountainResponse {

    private String name;
    private double height;
    private String address;
    private String imageUrl;
    private boolean isHot;
    private List<TrailListResponse> trails;
}
