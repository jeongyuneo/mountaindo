package com.hanssarang.backend.mountain.controller;

import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.service.MountainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/mountains")
public class MountainController {

    private final MountainService mountainService;

    @GetMapping
    public ResponseEntity<List<MountainResponse>> getMountains(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok()
                .body(mountainService.getMountains());
    }
}
