package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MountainListResponse {

    private int mountainId;
    private String name;
    private int height;
    private String address;
    private String imageUrl;
    private boolean isHot;
}
