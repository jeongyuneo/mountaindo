package com.hanssarang.backend.mountain.controller;

import com.hanssarang.backend.mountain.controller.dto.MountainListResponse;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.controller.dto.RecommendationListResponse;
import com.hanssarang.backend.mountain.controller.dto.TrailResponse;
import com.hanssarang.backend.mountain.service.MountainService;
import com.hanssarang.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.hanssarang.backend.common.domain.Message.AUTHORIZATION;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/mountains")
public class MountainController {

    private final MountainService mountainService;

    @GetMapping
    public ResponseEntity<List<MountainListResponse>> getMountains(@RequestParam String sort,
                                                                   @RequestParam String si,
                                                                   @RequestParam int page) {
        return ResponseEntity.ok()
                .body(mountainService.getMountains(sort, si, page));
    }

    @GetMapping("/{mountainId}")
    public ResponseEntity<MountainResponse> getMountain(@PathVariable int mountainId) {
        return ResponseEntity.ok()
                .body(mountainService.getMountain(mountainId));
    }

    @GetMapping("/trail/{trailId}")
    public ResponseEntity<TrailResponse> getTrail(@PathVariable int trailId) {
        return ResponseEntity.ok()
                .body(mountainService.getTrail(trailId));
    }

    @GetMapping("/search/1")
    public ResponseEntity<List<MountainListResponse>> searchMountain(@RequestParam String keyword,
                                                                     @RequestParam String sort,
                                                                     @RequestParam String si) {
        return ResponseEntity.ok()
                .body(mountainService.searchMountain(keyword, sort, si));
    }

    @GetMapping("/search/2")
    public ResponseEntity<List<MountainListResponse>> searchTrail(@RequestParam String keyword,
                                                                  @RequestParam String sort,
                                                                  @RequestParam String si) {
        return ResponseEntity.ok()
                .body(mountainService.searchTrail(keyword, sort, si));
    }

    @GetMapping("/recommendation")
    public ResponseEntity<RecommendationListResponse> getRecommendedTrails(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.ok()
                .body(mountainService.getRecommendedTrails(JwtUtil.getMemberId(token)));
    }
}
