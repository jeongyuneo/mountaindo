package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.hiking.controller.dto.HikingListResponse;
import com.hanssarang.backend.hiking.controller.dto.HikingRequest;
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

    @GetMapping("/1/{hikingId}")
    public ResponseEntity<HikingResponse> getHiking(@RequestHeader("Authorization") String token, @PathVariable int hikingId) {
        return ResponseEntity.ok(hikingService.getHiking(1));
    }

    @GetMapping("/2")
    public ResponseEntity<List<HikingListResponse>> getCompletedHikings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(hikingService.getCompletedHikings(1));
    }

    @PostMapping
    public ResponseEntity<Void> createHiking(@RequestHeader("Authorization") String token, @RequestBody HikingRequest hikingRequest) {
        hikingService.createHiking(1, hikingRequest);
        return ResponseEntity.ok().build();
    }
}
