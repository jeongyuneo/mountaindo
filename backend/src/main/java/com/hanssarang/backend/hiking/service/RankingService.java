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
        List<Member> members = memberRepository.findAllByIsActiveTrue()
                .stream()
                .sorted(Comparator.comparing(Member::getAccumulatedHeight).reversed())
                .collect(Collectors.toList());
        int myRanking = getMyRanking(memberId, members);
        Member member = members.get(myRanking - 1);
        return getRankingListResponse(members, myRanking, member);
    }

    @Transactional(readOnly = true)
    public RankingResponse searchRanking(String keyword) {
        List<Member> members = memberRepository.findAllByIsActiveTrue();
        members.sort(Comparator.comparing(Member::getAccumulatedHeight).reversed());
        return getRankingResponse(keyword, members);
    }

    @Transactional(readOnly = true)
    public RankingListResponse getRankingsOfMountain(int memberId, int mountainId) {
        List<Member> members = memberRepository.findAllByIsActiveTrue()
                .stream()
                .sorted(Comparator.comparing((Member member) -> member.getAccumulatedHeightInMountain(mountainId)).reversed())
                .collect(Collectors.toList());
        int myRanking = getMyRanking(memberId, members);
        Member member = members.get(myRanking - 1);
        return getRankingListResponse(members, myRanking, member)
    }

    @Transactional(readOnly = true)
    public RankingResponse searchRankingOfMountain(int mountainId, String keyword) {
        List<Member> members = memberRepository.findAllByIsActiveTrue();
        members.sort(Comparator.comparing((Member member) -> member.getAccumulatedHeightInMountain(mountainId)).reversed());
        return getRankingResponse(keyword, members);
    }

    private RankingListResponse getRankingListResponse(List<Member> members, int myRanking, Member member) {
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

    private RankingResponse getRankingResponse(String keyword, List<Member> members) {
        for (int ranking = 1; ranking <= members.size(); ranking++) {
            Member member = members.get(ranking - 1);
            if (member.getNickname().equals(keyword)) {
                return RankingResponse.builder()
                        .ranking(ranking)
                        .nickname(member.getNickname())
                        .imageUrl(member.getImageUrl())
                        .accumulatedHeight(member.getAccumulatedHeight())
                        .build();
            }
        }
        return RankingResponse.builder().build();
    }

    private int getMyRanking(int memberId, List<Member> members) {
        return IntStream.rangeClosed(1, members.size())
                .filter(ranking -> members.get(ranking - 1).getId() == memberId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
    }
}
