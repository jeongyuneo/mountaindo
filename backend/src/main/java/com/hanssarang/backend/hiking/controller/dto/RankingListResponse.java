package com.hanssarang.backend.hiking.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankingListResponse {

    private byte[] image;
    private int ranking;
    private String nickname;
    private int accumulatedHeight;
    private List<RankingResponse> rankings;
}
