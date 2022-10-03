package com.hanssarang.backend.mountain.controller;

import com.hanssarang.backend.mountain.controller.dto.MountainListResponse;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.controller.dto.TrailResponse;
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
    public ResponseEntity<List<MountainListResponse>> getMountains(@RequestHeader("Authorization") String token, @RequestParam String sort, @RequestParam int page) {
        return ResponseEntity.ok()
                .body(mountainService.getMountains(sort, page));
    }

    @GetMapping("/{mountainId}")
    public ResponseEntity<MountainResponse> getMountain(@RequestHeader("Authorization") String token, @PathVariable int mountainId) {
        return ResponseEntity.ok()
                .body(mountainService.getMountain(mountainId));
    }

    @GetMapping("/trail/{trailId}")
    public ResponseEntity<TrailResponse> getTrail(@RequestHeader("Authorization") String token, @PathVariable int trailId) {
        return ResponseEntity.ok()
                .body(mountainService.getTrail(trailId));
    }

    @GetMapping("/search/1")
    public ResponseEntity<List<MountainListResponse>> searchMountain(@RequestHeader("Authorization") String token,
                                                                     @RequestParam String keyword,
                                                                     @RequestParam String sort,
                                                                     @RequestParam(required = false) String si) {
        return ResponseEntity.ok()
                .body(mountainService.searchMountain(keyword, sort, si));
    }

    @GetMapping("/search/2")
    public ResponseEntity<List<MountainListResponse>> searchTrail(@RequestHeader("Authorization") String token,
                                                                  @RequestParam String keyword,
                                                                  @RequestParam String sort,
                                                                  @RequestParam(required = false) String si) {
        return ResponseEntity.ok()
                .body(mountainService.searchTrail(keyword, sort, si));
    }
}
