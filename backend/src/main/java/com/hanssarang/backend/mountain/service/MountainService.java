package com.hanssarang.backend.mountain.service;

import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MountainService {

    private final MountainRepository mountainRepository;

    public List<MountainResponse> getMountains() {
        List<Mountain> mountains = mountainRepository.findAll();
        return mountains.stream()
                .map(mountain -> MountainResponse.builder()
                        .mountainId(mountain.getMountainId())
                        .name(mountain.getName())
                        .height(mountain.getHeight())
                        .address(mountain.getAddress())
                        .imageUrl(mountain.getImageUrl())
                        .build())
                .collect(Collectors.toList());
    }
}
