package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
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

    @BeforeEach
    void setUp(){
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

        Hiking gi1 = Hiking.builder()
                .member(giyoon)
                .accumulatedHeight(100.0)
                .path(PATH)
                .isActive(true)
                .build();
        Hiking beom1 = Hiking.builder()
                .member(beomsu)
                .accumulatedHeight(150.0)
                .path(PATH)
                .isActive(true)
                .build();
        Hiking eun1 = Hiking.builder()
                .member(eunhye)
                .accumulatedHeight(51.0)
                .path(PATH)
                .isActive(true)
                .build();
        Hiking eun2 = Hiking.builder()
                .member(eunhye)
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
}
