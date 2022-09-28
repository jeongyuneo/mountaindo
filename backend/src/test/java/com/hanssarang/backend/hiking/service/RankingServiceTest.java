package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.domain.Hiking;
import com.hanssarang.backend.hiking.domain.HikingRepository;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.TrailRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class RankingServiceTest {

    private static final String PATH = "LINESTRING (0 0, 1 1, 2 2)";

    @Autowired
    private RankingService rankingService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private HikingRepository hikingRepository;

    @Autowired
    private TrailRepository trailRepository;

    @Autowired
    private MountainRepository mountainRepository;

    private Mountain mountain1;
    private Mountain mountain2;
    private Trail trail1;
    private Trail trail2;

    @BeforeEach
    void setUp() {
        Member giyoon = Member.builder()
                .email("giyoon@ssafy.io")
                .nickname("기윤")
                .imageUrl("asdf")
                .isActive(true)
                .build();
        Member beomsu = Member.builder()
                .email("beomsu@ssafy.io")
                .nickname("범수")
                .imageUrl("asdf")
                .isActive(true)
                .build();
        Member eunhye = Member.builder()
                .email("eunhye@ssafy.io")
                .nickname("은혜")
                .imageUrl("asdf")
                .isActive(true)
                .build();

        mountain1 = Mountain.builder()
                .name("싸피산")
                .isActive(true)
                .build();
        mountain2 = Mountain.builder()
                .name("대전산")
                .isActive(true)
                .build();
        mountainRepository.save(mountain1);
        mountainRepository.save(mountain2);

        trail1 = Trail.builder()
                .name("A코스")
                .mountain(mountain1)
                .isActive(true)
                .build();
        trail2 = Trail.builder()
                .name("1코스")
                .mountain(mountain2)
                .isActive(true)
                .build();
        trailRepository.save(trail1);
        trailRepository.save(trail2);

        Hiking gi1 = Hiking.builder()
                .member(giyoon)
                .trail(trail1)
                .accumulatedHeight(100.0)
                .path(PATH)
                .isActive(true)
                .build();
        Hiking beom1 = Hiking.builder()
                .member(beomsu)
                .trail(trail2)
                .accumulatedHeight(150.0)
                .path(PATH)
                .isActive(true)
                .build();
        Hiking eun1 = Hiking.builder()
                .member(eunhye)
                .trail(trail1)
                .accumulatedHeight(51.0)
                .path(PATH)
                .isActive(true)
                .build();
        Hiking eun2 = Hiking.builder()
                .member(eunhye)
                .trail(trail2)
                .accumulatedHeight(51.0)
                .path(PATH)
                .isActive(true)
                .build();

        giyoon.getHikings().add(gi1);
        beomsu.getHikings().add(beom1);
        eunhye.getHikings().add(eun1);
        eunhye.getHikings().add(eun2);

        memberRepository.save(giyoon);
        memberRepository.save(beomsu);
        memberRepository.save(eunhye);
    }

    @AfterEach
    void clear() {
        hikingRepository.deleteAll();
        trailRepository.deleteAll();
        mountainRepository.deleteAll();
        memberRepository.deleteAll();
    }

    @DisplayName("전체 랭킹 목록 조회")
    @Test
    void getRankingsTest() {
        // given

        // when
        RankingListResponse rankingListResponse = rankingService.getRankings(1);
        // then
        assertEquals(3, rankingListResponse.getRanking());
    }

    @DisplayName("산별 랭킹 목록 조회")
    @Test
    void getRankingsOfMountainTest() {
        // given

        // when
        RankingListResponse rankingListResponse = rankingService.getRankingsOfMountain(1, 1);
        // then
        assertEquals(1, rankingListResponse.getRanking());
    }
}
