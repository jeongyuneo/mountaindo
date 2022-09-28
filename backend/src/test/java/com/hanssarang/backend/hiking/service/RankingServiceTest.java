package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.hiking.domain.Hiking;
import com.hanssarang.backend.hiking.domain.HikingRepository;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.TrailRepository;
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

    private Member giyoon;
    private Member beomsu;
    private Member eunhye;
    private Member jeongyun;
    private Hiking gi1;
    private Hiking beom1;
    private Hiking eun1;
    private Hiking eun2;
    private Hiking jeong1;
    private Mountain mountain1;
    private Mountain mountain2;
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
        beomsu = Member.builder()
                .email("beomsu@ssafy.io")
                .nickname("범수")
                .imageUrl("asdf")
                .isActive(true)
                .build();
        eunhye = Member.builder()
                .email("eunhye@ssafy.io")
                .nickname("은혜")
                .imageUrl("asdf")
                .isActive(true)
                .build();
        jeongyun = Member.builder()
                .email("jeonyun@ssafy.io")
                .nickname("정윤")
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

        gi1 = Hiking.builder()
                .member(giyoon)
                .trail(trail1)
                .accumulatedHeight(100.0)
                .path(PATH)
                .isActive(true)
                .build();
        beom1 = Hiking.builder()
                .member(beomsu)
                .trail(trail2)
                .accumulatedHeight(150.0)
                .path(PATH)
                .isActive(true)
                .build();
        eun1 = Hiking.builder()
                .member(eunhye)
                .trail(trail1)
                .accumulatedHeight(51.0)
                .path(PATH)
                .isActive(true)
                .build();
        eun2 = Hiking.builder()
                .member(eunhye)
                .trail(trail2)
                .accumulatedHeight(51.0)
                .path(PATH)
                .isActive(true)
                .build();
        jeong1 = Hiking.builder()
                .member(jeongyun)
                .accumulatedHeight(50.0)
                .path(PATH)
                .isActive(true)
                .build();

        giyoon.getHikings().add(gi1);
        beomsu.getHikings().add(beom1);
        eunhye.getHikings().add(eun1);
        eunhye.getHikings().add(eun2);
        jeongyun.getHikings().add(jeong1);

        memberRepository.save(giyoon);
        memberRepository.save(beomsu);
        memberRepository.save(eunhye);
        memberRepository.save(jeongyun);
    }

    @DisplayName("전체 랭킹 목록 조회")
    @Test
    void getRankingsTest() {
        // given

        // when
        RankingListResponse rankingListResponse = rankingService.getRankings(1);
        // then
        assertEquals(5, rankingListResponse.getRanking());
    }

    @DisplayName("전체 랭킹 목록 검색")
    @Test
    void searchRanking() {
        // given

        // when
        RankingResponse rankingResponse = rankingService.searchRanking("기윤");
        // then
        assertEquals("기윤", rankingResponse.getNickname());
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
