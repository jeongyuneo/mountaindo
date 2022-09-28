package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrailResponse {

    private String name;
    private String goingUpTime;
    private String goingDownTime;
    private String length;
    private String risk;
}
