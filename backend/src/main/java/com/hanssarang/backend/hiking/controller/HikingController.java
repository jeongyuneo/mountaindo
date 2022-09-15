package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.hiking.controller.dto.HikingListResponse;
import com.hanssarang.backend.hiking.service.HikingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/hikings")
public class HikingController {

    private final HikingService hikingService;

    @GetMapping
    public ResponseEntity<HikingListResponse> getHikings(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(hikingService.getHikings(1));
    }
}
