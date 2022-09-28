package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RankingService {

    private final MemberRepository memberRepository;

    public RankingListResponse getRankings(int memberId) {
        return null;
    }

    @Transactional(readOnly = true)
    public RankingResponse searchRanking(String keyword) {
        List<Member> members = memberRepository.findAllByIsActiveTrue();
        members.sort(Comparator.comparing(Member::getAccumulatedHeight).reversed());
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

    public RankingListResponse getRankingsOfMountain(int memberId, int mountainId) {
        return null;
    }

    public RankingResponse searchRankingOfMountain(int mountainId, String keyword) {
        return null;
    }
}
