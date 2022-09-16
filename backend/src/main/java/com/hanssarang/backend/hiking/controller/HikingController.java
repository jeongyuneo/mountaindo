package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.hiking.controller.dto.HikingListResponse;
import com.hanssarang.backend.hiking.controller.dto.HikingResponse;
import com.hanssarang.backend.hiking.service.HikingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/hikings")
public class HikingController {

    private final HikingService hikingService;

    @GetMapping
    public ResponseEntity<List<HikingListResponse>> getHikings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(hikingService.getHikings(1));
    }

    @GetMapping("/{hikingId}")
    public ResponseEntity<HikingResponse> getHiking(@RequestHeader("Authorization") String token, @PathVariable int hikingId) {
        return ResponseEntity.ok(hikingService.getHiking(1));
    }
}
