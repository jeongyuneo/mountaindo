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
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_MEMBER;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HikingServiceTest {

    private static final String LINESTRING_PATH = "LINESTRING (10.0 20.0, 20.0 40.0, 30.0 60.0)";
    private static final String MULTILINESTRING_PATH = "MULTILINESTRING ((10.0 20.0, 20.0 40.0, 30.0 10.0), (10.0 20.0, 20.0 40.0, 30.0 5.0))";

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
    private Trail trail1;
    private Trail trail2;

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

        trail1 = Trail.builder()
                .mountain(mountain)
                .name("A코스")
                .path(LINESTRING_PATH)
                .isActive(true)
                .build();
        trail2 = Trail.builder()
                .mountain(mountain)
                .name("B코스")
                .path(MULTILINESTRING_PATH)
                .isActive(true)
                .build();
        trailRepository.save(trail1);
        trailRepository.save(trail2);
    }

    @Transactional
    @DisplayName("등산 기록 저장 성공 - LINESTRING 코스")
    @Test
    void createHiking() {
        // given
        HikingRequest hikingRequest = HikingRequest.builder()
                .trailId(1)
                .accumulatedHeight(100.0)
                .distance(5000.0)
                .endPoint(PathResponse.builder().latitude(30.0).longitude(60.0).build())
                .path(IntStream.range(1, 4)
                        .mapToObj(n -> PathResponse.builder().latitude(10.0 * n).longitude(20.0 * n).build())
                        .collect(Collectors.toList()))
                .build();
        // when
        hikingService.createHiking(1, hikingRequest);
        Member savedMember = memberRepository.findById(1)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        // then
        assertEquals(LINESTRING_PATH, savedMember.getHikings().get(0).getPath());
        assertTrue(savedMember.getHikings().get(0).isCompleted());
    }

    @Transactional
    @DisplayName("등산 기록 저장 - MULTILINESTRING 코스")
    @Test
    void createHikingInMultiLineString() {
        // given
        HikingRequest hikingRequest = HikingRequest.builder()
                .trailId(4)
                .accumulatedHeight(100.0)
                .distance(5000.0)
                .endPoint(PathResponse.builder().latitude(30.0).longitude(30.0).build())
                .path(IntStream.range(1, 4)
                        .mapToObj(n -> PathResponse.builder().latitude(10.0 * n).longitude(20.0 * n).build())
                        .collect(Collectors.toList()))
                .build();
        // when
        hikingService.createHiking(2, hikingRequest);
        Member savedMember = memberRepository.findById(2)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        // then
        assertEquals(LINESTRING_PATH, savedMember.getHikings().get(0).getPath());
        assertFalse(savedMember.getHikings().get(0).isCompleted());
    }
}
