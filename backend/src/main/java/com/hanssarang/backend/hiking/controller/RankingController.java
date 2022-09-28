package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.hiking.service.RankingService;
import com.hanssarang.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rankings")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping
    public ResponseEntity<RankingListResponse> getRankings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(rankingService.getRankings(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/1")
    public ResponseEntity<RankingResponse> searchRanking(@RequestHeader("Authorization") String token, @RequestParam String keyword) {
        return ResponseEntity.ok(rankingService.searchRanking(keyword));
    }

    @GetMapping("/2/{mountainId}")
    public ResponseEntity<RankingListResponse> getRankingsOfMountain(@RequestHeader("Authorization") String token, @PathVariable int mountainId) {
        return ResponseEntity.ok(rankingService.getRankingsOfMountain(JwtUtil.getMemberId(token), mountainId));
    }

    @GetMapping("/3/{mountainId}")
    public ResponseEntity<RankingResponse> searchRankingOfMountain(@RequestHeader("Authorization") String token, @PathVariable int mountainId, @RequestParam String keyword) {
        return ResponseEntity.ok(rankingService.searchRankingOfMountain(mountainId, keyword));
    }
}
