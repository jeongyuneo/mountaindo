package com.hanssarang.backend.mountain.service;

import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.mountain.controller.dto.MountainListResponse;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.controller.dto.TrailListResponse;
import com.hanssarang.backend.mountain.controller.dto.TrailResponse;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.TrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_MOUNTAIN;
import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_TRAIL;

@RequiredArgsConstructor
@Service
public class MountainService {

    private static final int MOUNTAIN_LIST_RESPONSE_SIZE = 50;
    private static final String NAME = "name";
    private static final String HEIGHT = "height";
    private static final String HIGH_HEIGHT = "high-height";
    private static final String LOW_HEIGHT = "low-height";
    private static final String POPULARITY = "popularity";

    private final MountainRepository mountainRepository;
    private final TrailRepository trailRepository;

    public List<MountainListResponse> getMountains(String sort, int page) {
        List<Mountain> mountains = null;
        if (sort.equals(NAME)) {
            mountains = mountainRepository.findAll(PageRequest.of(page, MOUNTAIN_LIST_RESPONSE_SIZE, Sort.by(NAME).ascending())).getContent();
        } else if (sort.equals(HIGH_HEIGHT)) {
            mountains = mountainRepository.findAll(PageRequest.of(page, MOUNTAIN_LIST_RESPONSE_SIZE, Sort.by(HEIGHT).descending())).getContent();
        } else if (sort.equals(LOW_HEIGHT)) {
            mountains = mountainRepository.findAll(PageRequest.of(page, MOUNTAIN_LIST_RESPONSE_SIZE, Sort.by(HEIGHT).ascending())).getContent();
        } else if (sort.equals(POPULARITY)) {
            mountains = mountainRepository.findAllPopularity(page * MOUNTAIN_LIST_RESPONSE_SIZE, MOUNTAIN_LIST_RESPONSE_SIZE);
        }
        return getMountainListResponses(mountains);
    }

    @Transactional(readOnly = true)
    public MountainResponse getMountain(int mountainId) {
        Mountain mountain = mountainRepository.findById(mountainId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MOUNTAIN));
        return MountainResponse.builder()
                .name(mountain.getName())
                .height(mountain.getHeight())
                .address(mountain.getAddress().getFullAddress())
                .imageUrl(mountain.getImageUrl())
                .isHot(isHotMountain(mountainRepository.findIsHot(), mountain.getId()))
                .trails(mountain.getTrails()
                        .stream()
                        .map(trail -> TrailListResponse.builder()
                                .trailId(trail.getId())
                                .name(trail.getName())
                                .length(trail.getLength())
                                .level(trail.getLevel().toString())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public TrailResponse getTrail(int trailId) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_TRAIL));
        return TrailResponse.builder()
                .name(trail.getName())
                .goingUpTime(trail.getGoingUpTime())
                .goingDownTime(trail.getGoingDownTime())
                .length(trail.getLength())
                .risk(trail.getRisk())
                .build();
    }

    public List<MountainListResponse> searchMountainOrTrail(String keyword) {
        Set<Mountain> mountains = new HashSet<>();
        mountains.addAll(mountainRepository.findByNameContaining(keyword));
        mountains.addAll(mountainRepository.findByTrailNameContaining(keyword));
        return getMountainListResponses(mountains);
    }

    public List<MountainListResponse> searchMountain(String keyword) {
        return getMountainListResponses(mountainRepository.findByNameContaining(keyword));
    }

    public List<MountainListResponse> searchTrail(String keyword) {
        return getMountainListResponses(mountainRepository.findByTrailNameContaining(keyword));
    }

    private List<MountainListResponse> getMountainListResponses(Collection<Mountain> mountains) {
        return mountains.stream()
                .map(mountain -> MountainListResponse.builder()
                        .mountainId(mountain.getId())
                        .name(mountain.getName())
                        .height(mountain.getHeight())
                        .address(mountain.getAddress().getFullAddress())
                        .imageUrl(mountain.getImageUrl())
                        .isHot(isHotMountain(mountainRepository.findIsHot(), mountain.getId()))
                        .build())
                .collect(Collectors.toList());
    }

    private boolean isHotMountain(List<Mountain> hotMountains, int mountainId) {
        return hotMountains.stream()
                .anyMatch(mountain -> mountain.getId() == mountainId);
    }
}
