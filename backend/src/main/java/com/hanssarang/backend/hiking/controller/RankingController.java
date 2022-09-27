package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.hiking.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rankings")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping
    public ResponseEntity<RankingListResponse> getRankings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(rankingService.getRankings(1));
    }

    @GetMapping("/1")
    public ResponseEntity<List<RankingResponse>> searchRanking(@RequestHeader("Authorization") String token, @RequestParam String keyword) {
        return ResponseEntity.ok()
                .body(rankingService.searchRanking(keyword));
    }

    @GetMapping("/2/{mountainId}")
    public ResponseEntity<RankingListResponse> getRankingsOfMountain(@RequestHeader("Authorization") String token, @PathVariable int mountainId) {
        return ResponseEntity.ok()
                .body(rankingService.getRankingsOfMountain(1, mountainId));
    }

    @GetMapping("/3/{mountainId}")
    public ResponseEntity<RankingResponse> searchRankingOfMountain(@RequestHeader("Authorization") String token, @PathVariable int mountainId, @RequestParam String keyword) {
        return ResponseEntity.ok()
                .body(rankingService.searchRankingOfMountain(mountainId, keyword));
    }
}
