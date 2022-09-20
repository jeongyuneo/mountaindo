package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankingResponse {

    private String imageUrl;
    private int ranking;
    private String nickname;
    private int accumulatedHeight;
}
