package com.hanssarang.backend.mountain.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrailResponse {

    private String name;
    private int goingUpTime;
    private int goingDownTime;
    private double length;
    private String risk;
}
