package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.HikingRequest;
import com.hanssarang.backend.hiking.controller.dto.PathResponse;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.TrailRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_MEMBER;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class HikingServiceTest {

    private static final String PATH = "LINESTRING (10.0 20.0, 20.0 40.0, 30.0 60.0)";

    @Autowired
    private HikingService hikingService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TrailRepository trailRepository;

    @Autowired
    private MountainRepository mountainRepository;

    private Member giyoon;
    private Mountain mountain;
    private Trail trail;

    @BeforeEach
    void setUp() {
        giyoon = Member.builder()
                .email("giyoon@ssafy.io")
                .nickname("기윤")
                .imageUrl("asdf")
                .isActive(true)
                .build();
        memberRepository.save(giyoon);

        mountain = Mountain.builder()
                .name("싸피산")
                .isActive(true)
                .build();
        mountainRepository.save(mountain);

        trail = Trail.builder()
                .name("A코스")
                .mountain(mountain)
                .isActive(true)
                .build();
        trailRepository.save(trail);
    }

    @Transactional
    @Test
    void createHiking() {
        // given
        HikingRequest hikingRequest = HikingRequest.builder()
                .trailId(1)
                .accumulatedHeight(100.0)
                .distance(5000.0)
                .endPoint(PathResponse.builder().latitude(10.0).longitude(20.0).build())
                .path(IntStream.range(1, 4)
                        .mapToObj(n -> PathResponse.builder().latitude(10.0 * n).longitude(20.0 * n).build())
                        .collect(Collectors.toList()))
                .build();
        // when
        hikingService.createHiking(1, hikingRequest);
        Member member = memberRepository.findById(1)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        // then
        assertEquals(PATH, member.getHikings().get(0).getPath());
    }
}
