package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.*;
import com.hanssarang.backend.hiking.domain.Hiking;
import com.hanssarang.backend.hiking.domain.HikingRepository;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.TrailRepository;
import com.hanssarang.backend.util.PathUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.hanssarang.backend.common.domain.ErrorMessage.*;

@RequiredArgsConstructor
@Service
public class HikingService {

    private static final String LINESTRING = "LINESTRING ";
    private static final String OPENING_PARENTHESIS = "(";
    private static final String CLOSING_PARENTHESIS = ")";
    private static final String DELIMITER = " ";
    private static final String REST = ",";
    private static final int LATITUDE = 0;
    private static final int LONGITUDE = 1;

    private final MemberRepository memberRepository;
    private final TrailRepository trailRepository;
    private final HikingRepository hikingRepository;

    public List<HikingListResponse> getHikings(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        List<HikingListResponse> hikingListResponses = new ArrayList<>();
        member.getHikings()
                .stream()
                .collect(Collectors.groupingBy(hiking -> hiking.getTrail().getMountain().getName()))
                .forEach((mountainName, hikings) -> {
                    Hiking lastHiking = hikings.get(hikings.size() - 1);
                    hikingListResponses.add(
                            HikingListResponse.builder()
                                    .mountainName(mountainName)
                                    .address(lastHiking.getTrail().getMountain().getAddress().getFullAddress())
                                    .lastHikingDate(lastHiking.getCreatedDate().toLocalDate())
                                    .lastHikingTrailName(lastHiking.getTrail().getName())
                                    .build()
                    );
                });
        return hikingListResponses;
    }

    public HikingResponse getHiking(int hikingId, int memberId) {
        Hiking hiking = hikingRepository.findByIdAndMemberId(hikingId, memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_HIKING));
        Trail trail = hiking.getTrail();
        Mountain mountain = trail.getMountain();
        return HikingResponse.builder()
                .mountainName(mountain.getName())
                .address(mountain.getAddress().getFullAddress())
                .trailName(trail.getName())
                .distance(hiking.getDistance())
                .useTime(hiking.getUseTime())
                .imageUrl(hiking.getImageUrl())
                .accumulatedHeight(hiking.getAccumulatedHeight())
                .build();
    }

    @Transactional(readOnly = true)
    public List<CompletedHikingListResponse> getCompletedHikings(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        List<CompletedHikingListResponse> completedHikingListResponses = new ArrayList<>();
        member.getHikings()
                .stream()
                .filter(Hiking::isCompleted)
                .collect(Collectors.groupingBy(hiking -> hiking.getTrail().getMountain().getId()))
                .forEach((mountainId, hikings) -> {
                    Hiking hiking = hikings.get(0);
                    String path = hiking.getTrail().getPath();
                    double[] centralCoordinate = PathUtil.find(path).getCentralCoordinate(path);
                    completedHikingListResponses.add(
                            CompletedHikingListResponse.builder()
                                    .mountainName(hiking.getTrail().getMountain().getName())
                                    .address(hiking.getTrail().getMountain().getAddress().getFullAddress())
                                    .lastHikingDate(hiking.getCreatedDate().toLocalDate())
                                    .lastHikingTrailName(hiking.getTrail().getName())
                                    .latitude(centralCoordinate[LATITUDE])
                                    .longitude(centralCoordinate[LONGITUDE])
                                    .build()
                    );
                });
        return completedHikingListResponses;
    }

    @Transactional
    public void createHiking(int memberId, HikingRequest hikingRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        Trail trail = trailRepository.findById(hikingRequest.getTrailId())
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_TRAIL));
        member.addHiking(
                Hiking.builder()
                        .trail(trail)
                        .distance(hikingRequest.getDistance())
                        .accumulatedHeight(hikingRequest.getAccumulatedHeight())
                        .useTime(hikingRequest.getUseTime())
                        .path(toLineStringForm(hikingRequest.getPath()))
                        .isCompleted(isCompleted(trail.getPath(), hikingRequest.getEndPoint()))
                        .isActive(true)
                        .build()
        );
        memberRepository.save(member);
    }

    private boolean isCompleted(String path, PathResponse endPoint) {
        return PathUtil.find(path)
                .isCompleted(path, endPoint.getLatitude(), endPoint.getLongitude());
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
