package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.common.domain.ErrorMessage;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
        return getRankingListResponse(members, myRanking, member);
    }

    @Transactional(readOnly = true)
    public RankingResponse searchRankingOfMountain(int mountainId, String keyword) {
        List<Member> members = memberRepository.findAllByIsActiveTrue();
        members.sort(Comparator.comparing((Member member) -> member.getAccumulatedHeightInMountain(mountainId)).reversed());
        return getRankingResponse(keyword, members);
    }

    private RankingListResponse getRankingListResponse(List<Member> members, int myRanking, Member member) {
        List<RankingResponse> rankings = new ArrayList<>();
        IntStream.range(1, members.size())
                .forEach(ranking -> {
                    Member currentMember = members.get(ranking - 1);
                    rankings.add(getRankingResponse(ranking, currentMember));
                });
        return RankingListResponse.builder()
                .image(ImageUtil.toByteArray(member.getImageUrl()))
                .ranking(myRanking)
                .nickname(member.getNickname())
                .accumulatedHeight(member.getAccumulatedHeight())
                .rankings(rankings)
                .build();
    }

    private RankingResponse getRankingResponse(String keyword, List<Member> members) {
        for (int ranking = 1; ranking <= members.size(); ranking++) {
            Member member = members.get(ranking - 1);
            if (member.getNickname().equals(keyword)) {
                return getRankingResponse(ranking, member);
            }
        }
        return RankingResponse.builder().build();
    }

    private RankingResponse getRankingResponse(int ranking, Member member) {
        return RankingResponse.builder()
                .ranking(ranking)
                .nickname(member.getNickname())
                .image(ImageUtil.toByteArray(member.getImageUrl()))
                .accumulatedHeight(member.getAccumulatedHeight())
                .build();
    }

    private int getMyRanking(int memberId, List<Member> members) {
        return IntStream.rangeClosed(1, members.size())
                .filter(ranking -> members.get(ranking - 1).getId() == memberId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }
}
