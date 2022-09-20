package com.hanssarang.backend.mountain.controller;

import com.hanssarang.backend.mountain.controller.dto.MountainListResponse;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.service.MountainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/mountains")
public class MountainController {

    private final MountainService mountainService;

    @GetMapping
    public ResponseEntity<List<MountainListResponse>> getMountains(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(mountainService.getMountains());
    }

    @GetMapping("/{mountainId}")
    public ResponseEntity<MountainResponse> getMountain(@RequestHeader("Authorization") String token, @PathVariable int mountainId) {
        return ResponseEntity.ok(mountainService.getMountain(mountainId));
    }

    @GetMapping("/search/2")
    public ResponseEntity<List<MountainListResponse>> searchMountain(@RequestHeader("Authorization") String token, @RequestParam String name) {
        return ResponseEntity.ok(mountainService.searchMountain(name));
    }

    @GetMapping("/search/3")
    public ResponseEntity<List<MountainListResponse>> searchTrail(@RequestHeader("Authorization") String token, @RequestParam String name) {
        return ResponseEntity.ok(mountainService.searchTrail(name));
    }
}
