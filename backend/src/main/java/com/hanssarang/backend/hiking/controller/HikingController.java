package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.hiking.controller.dto.CompletedHikingListResponse;
import com.hanssarang.backend.hiking.controller.dto.HikingListResponse;
import com.hanssarang.backend.hiking.controller.dto.HikingRequest;
import com.hanssarang.backend.hiking.controller.dto.HikingResponse;
import com.hanssarang.backend.hiking.service.HikingService;
import com.hanssarang.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/hikings")
public class HikingController {

    private final HikingService hikingService;

    @GetMapping
    public ResponseEntity<List<HikingListResponse>> getHikings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(hikingService.getHikings(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/1/{hikingId}")
    public ResponseEntity<HikingResponse> getHiking(@RequestHeader("Authorization") String token, @PathVariable int hikingId) {
        return ResponseEntity.ok()
                .body(hikingService.getHiking(JwtUtil.getMemberId(token), hikingId));
    }

    @GetMapping("/2")
    public ResponseEntity<List<CompletedHikingListResponse>> getCompletedHikings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(hikingService.getCompletedHikings(JwtUtil.getMemberId(token)));
    }

    @PostMapping
    public ResponseEntity<Void> createHiking(@RequestHeader("Authorization") String token, @RequestPart HikingRequest hikingRequest, @RequestPart("file") MultipartFile multipartFile) {
        hikingService.createHiking(JwtUtil.getMemberId(token), hikingRequest, multipartFile);
        return ResponseEntity.ok().build();
    }
}
