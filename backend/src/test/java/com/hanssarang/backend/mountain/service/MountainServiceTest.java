package com.hanssarang.backend.mountain.service;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import com.hanssarang.backend.mountain.domain.TrailRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class MountainServiceTest {

    @Autowired
    private MountainRepository mountainRepository;

    @Autowired
    private TrailRepository trailRepository;

    @Autowired
    private MountainService mountainService;

    private Mountain mountain;
    private Trail trail;

    @BeforeEach
    void setUp() {
        mountain = Mountain.builder()
                .name("한라산")
                .height(1.0)
                .address(Address.builder()
                        .si("제주시")
                        .gu("구구구")
                        .dong("우동")
                        .build())
                .imageUrl("qdfasv")
                .build();
        mountainRepository.save(mountain);
    }

    @Test
    void getMountain() {
        MountainResponse mountainResponse = mountainService.getMountain(11);
        assertEquals(mountain.getName(), mountainResponse.getName());
        assertEquals(mountain.getHeight(), mountainResponse.getHeight());
        assertEquals(mountain.getAddress().getFullAddress(), mountainResponse.getAddress());
        assertEquals(mountain.getImageUrl(), mountainResponse.getImageUrl());
    }
}