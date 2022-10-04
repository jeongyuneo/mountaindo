package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankingResponse {

    private byte[] image;
    private int ranking;
    private String nickname;
    private int accumulatedHeight;
}
