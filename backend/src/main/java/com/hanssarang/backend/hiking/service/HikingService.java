package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.common.domain.ErrorMessage;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.*;
import com.hanssarang.backend.hiking.domain.Hiking;
import com.hanssarang.backend.hiking.domain.HikingRepository;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.TrailRepository;
import com.hanssarang.backend.util.ImageUtil;
import com.hanssarang.backend.util.PathUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class HikingService {

    private static final int LATITUDE = 0;
    private static final int LONGITUDE = 1;
    private static final String HIKING = "hiking";

    private final MemberRepository memberRepository;
    private final TrailRepository trailRepository;
    private final HikingRepository hikingRepository;

    public List<HikingListResponse> getHikings(int memberId) {
        Member member = findMember(memberId);
        return member.getHikings()
                .stream()
                .sorted(Comparator.comparing(Hiking::getCreatedDate).reversed())
                .map(hiking -> HikingListResponse.builder()
                        .hikingId(hiking.getId())
                        .trailName(hiking.getTrail().getName())
                        .lastHikingDate(hiking.getCreatedDate().toLocalDate())
                        .useTime(hiking.getUseTime())
                        .level(hiking.getTrail().getLevel().toString())
                        .mountainName(hiking.getTrail().getMountain().getName())
                        .build())
                .collect(Collectors.toList());
    }

    public HikingResponse getHiking(int memberId, int hikingId) {
        Hiking hiking = findHiking(memberId, hikingId);
        Trail trail = hiking.getTrail();
        Mountain mountain = trail.getMountain();
        return HikingResponse.builder()
                .mountainName(mountain.getName())
                .address(mountain.getAddress().getFullAddress())
                .trailName(trail.getName())
                .distance(hiking.getDistance())
                .useTime(hiking.getUseTime())
                .image(ImageUtil.toByteArray(hiking.getImageUrl()))
                .accumulatedHeight(hiking.getAccumulatedHeight())
                .build();
    }

    @Transactional(readOnly = true)
    public List<CompletedHikingListResponse> getCompletedHikings(int memberId) {
        Member member = findMember(memberId);
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
    public void createHiking(int memberId, HikingRequest hikingRequest, MultipartFile multipartFile) {
        Member member = findMember(memberId);
        Trail trail = findTrail(hikingRequest);
        member.addHiking(
                Hiking.builder()
                        .trail(trail)
                        .distance(hikingRequest.getDistance())
                        .accumulatedHeight(hikingRequest.getAccumulatedHeight())
                        .useTime(hikingRequest.getUseTime())
                        .path(PathUtil.toLineStringForm(hikingRequest.getPath()))
                        .imageUrl(ImageUtil.saveImage(multipartFile, HIKING))
                        .isCompleted(isCompleted(trail.getPath(), hikingRequest.getEndPoint()))
                        .isActive(true)
                        .build()
        );
        memberRepository.save(member);
    }

    private Member findMember(int memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private Trail findTrail(HikingRequest hikingRequest) {
        return trailRepository.findById(hikingRequest.getTrailId())
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_TRAIL));
    }

    private Hiking findHiking(int memberId, int hikingId) {
        return hikingRepository.findByIdAndMemberId(hikingId, memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_HIKING));
    }

    private boolean isCompleted(String path, PathResponse endPoint) {
        return PathUtil.find(path)
                .isCompleted(path, endPoint.getLatitude(), endPoint.getLongitude());
    }
}
