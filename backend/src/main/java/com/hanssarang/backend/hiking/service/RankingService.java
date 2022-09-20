package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import org.springframework.stereotype.Service;

@Service
public class RankingService {

    public RankingListResponse getRankings(int memberId) {
        return null;
    }

    public RankingResponse searchRanking(String nickname) {
        return null;
    }

    public RankingListResponse getRankingsOfMountain(int memberId, int mountainId) {
        return null;
    }

    public RankingResponse searchRankingOfMountain(int mountainId, String nickname) {
        return null;
    }
}
