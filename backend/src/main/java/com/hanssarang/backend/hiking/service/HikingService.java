package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.HikingListResponse;
import com.hanssarang.backend.hiking.controller.dto.HikingRequest;
import com.hanssarang.backend.hiking.controller.dto.HikingResponse;
import com.hanssarang.backend.hiking.controller.dto.PathResponse;
import com.hanssarang.backend.hiking.domain.Hiking;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.TrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_MEMBER;
import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_TRAIL;

@RequiredArgsConstructor
@Service
public class HikingService {

    private static final String LINESTRING = "LINESTRING ";
    private static final String OPENING_PARENTHESIS = "(";
    private static final String CLOSING_PARENTHESIS = ")";
    private static final String DELIMITER = " ";
    private static final String REST = ",";

    private final MemberRepository memberRepository;
    private final TrailRepository trailRepository;

    public List<HikingListResponse> getHikings(int memberId) {
        return null;
    }

    public HikingResponse getHiking(int hikingId) {
        return null;
    }

    public List<HikingListResponse> getCompletedHikings(int memberId) {
        return null;
    }

    @Transactional
    public void createHiking(int memberId, HikingRequest hikingRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        Trail trail = trailRepository.findById(hikingRequest.getTrailId())
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_TRAIL));
        String path = toLineStringForm(hikingRequest.getPath());
        member.addHiking(Hiking.builder()
                .member(member)
                .trail(trail)
                .distance(hikingRequest.getDistance())
                .accumulatedHeight(hikingRequest.getAccumulatedHeight())
                .useTime(hikingRequest.getUseTime())
                .path(path)
                .isCompleted(isCompleted(trail.getPath(), hikingRequest.getEndPoint()))
                .isActive(true)
                .build());
        memberRepository.save(member);
    }

    private boolean isCompleted(String path, PathResponse endPoint) {
        return false;
    }

    private String toLineStringForm(List<PathResponse> path) {
        return LINESTRING
                + OPENING_PARENTHESIS
                + path.stream()
                .map(point -> point.getLatitude() + DELIMITER + point.getLongitude())
                .collect(Collectors.joining(REST + DELIMITER))
                + CLOSING_PARENTHESIS;
    }
}
