package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrailListResponse {

    private String name;
    private String length;
    private String level;
    private String imageUrl;
}
