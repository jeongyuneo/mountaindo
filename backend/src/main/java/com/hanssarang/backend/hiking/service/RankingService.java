package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_MEMBER;

@RequiredArgsConstructor
@Service
public class RankingService {

    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public RankingListResponse getRankings(int memberId) {
        List<Member> members = memberRepository.findAllByIsActiveTrue();
        members.sort(Comparator.comparing(Member::getAccumulatedHeight).reversed());
        int myRanking = IntStream.rangeClosed(1, members.size())
                .filter(ranking -> members.get(ranking - 1).getId() == memberId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        Member member = members.get(myRanking - 1);
        return RankingListResponse.builder()
                .imageUrl(member.getImageUrl())
                .ranking(myRanking)
                .nickname(member.getNickname())
                .accumulatedHeight(member.getAccumulatedHeight())
                .rankings(members.stream()
                        .map(currentMember -> RankingResponse.builder()
                                .imageUrl(currentMember.getImageUrl())
                                .nickname(currentMember.getNickname())
                                .accumulatedHeight(currentMember.getAccumulatedHeight())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public RankingResponse searchRanking(String keyword) {
        return null;
    }

    public RankingListResponse getRankingsOfMountain(int memberId, int mountainId) {
        return null;
    }

    public RankingResponse searchRankingOfMountain(int mountainId, String keyword) {
        return null;
    }
}
