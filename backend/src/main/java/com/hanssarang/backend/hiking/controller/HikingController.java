package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.hiking.controller.dto.*;
import com.hanssarang.backend.hiking.service.HikingService;
import com.hanssarang.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.hanssarang.backend.common.domain.Message.AUTHORIZATION;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/hikings")
public class HikingController {

    private final HikingService hikingService;

    @GetMapping
    public ResponseEntity<List<HikingListResponse>> getHikings(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.ok()
                .body(hikingService.getHikings(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/1/{hikingId}")
    public ResponseEntity<HikingResponse> getHiking(@RequestHeader(AUTHORIZATION) String token, @PathVariable int hikingId) {
        return ResponseEntity.ok()
                .body(hikingService.getHiking(JwtUtil.getMemberId(token), hikingId));
    }

    @GetMapping("/2")
    public ResponseEntity<List<CompletedHikingListResponse>> getCompletedHikings(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.ok()
                .body(hikingService.getCompletedHikings(JwtUtil.getMemberId(token)));
    }

    @PostMapping
    public ResponseEntity<HikingIdResponse> createHiking(@RequestHeader(AUTHORIZATION) String token, @RequestBody HikingRequest hikingRequest) {
        return ResponseEntity.ok()
                .body(hikingService.createHiking(JwtUtil.getMemberId(token), hikingRequest));
    }

    @PostMapping("/image/{hikingId}")
    public ResponseEntity<Void> createImage(@RequestHeader(AUTHORIZATION) String token, @PathVariable int hikingId, @RequestParam("file") MultipartFile multipartFile) {
        hikingService.createImage(JwtUtil.getMemberId(token), hikingId, multipartFile);
        return ResponseEntity.ok().build();
    }
}
