package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.hiking.domain.Hiking;
import com.hanssarang.backend.hiking.domain.HikingRepository;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
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

    private Member giyoon;
    private Member beomsu;
    private Member eunhye;
    private Member jeongyun;

    private Hiking gi1;
    private Hiking beom1;
    private Hiking eun1;
    private Hiking eun2;
    private Hiking jeong1;

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

        gi1 = Hiking.builder()
                .member(giyoon)
                .accumulatedHeight(100.0)
                .path(PATH)
                .isActive(true)
                .build();
        beom1 = Hiking.builder()
                .member(beomsu)
                .accumulatedHeight(150.0)
                .path(PATH)
                .isActive(true)
                .build();
        eun1 = Hiking.builder()
                .member(eunhye)
                .accumulatedHeight(51.0)
                .path(PATH)
                .isActive(true)
                .build();
        eun2 = Hiking.builder()
                .member(eunhye)
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
}
