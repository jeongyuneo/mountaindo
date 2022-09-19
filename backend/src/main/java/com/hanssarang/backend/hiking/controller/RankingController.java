package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingSearchResponse;
import com.hanssarang.backend.hiking.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rankings")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping
    public ResponseEntity<RankingResponse> getRankings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(rankingService.getRankings(1));
    }

    @GetMapping("/1")
    public ResponseEntity<RankingSearchResponse> searchRanking(@RequestHeader("Authorization") String token, @RequestParam String nickname) {
        return ResponseEntity.ok(rankingService.searchRanking(nickname));
    }
}
