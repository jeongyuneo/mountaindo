package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HikingPath {

    private double x;
    private double y;
}
