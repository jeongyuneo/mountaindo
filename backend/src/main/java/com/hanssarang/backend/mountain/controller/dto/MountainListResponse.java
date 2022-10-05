package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MountainListResponse {

    private int mountainId;
    private String name;
    private double height;
    private String address;
    private String imageUrl;
    private boolean isHot;
}
