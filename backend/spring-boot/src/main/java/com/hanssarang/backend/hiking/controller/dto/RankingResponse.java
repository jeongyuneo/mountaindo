package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankingResponse {

    private String imageUrl;
    private int ranking;
    private String nickname;
    private int accumulatedHeight;
}
