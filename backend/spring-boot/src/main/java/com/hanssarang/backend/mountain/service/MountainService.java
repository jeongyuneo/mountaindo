package com.hanssarang.backend.mountain.service;

import com.hanssarang.backend.common.domain.ErrorMessage;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.domain.Hiking;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberBasedRecommendation;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.member.domain.SurveyBasedRecommendation;
import com.hanssarang.backend.mountain.controller.dto.*;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import com.hanssarang.backend.mountain.domain.Trail;
import com.hanssarang.backend.mountain.domain.TrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_MOUNTAIN;
import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_TRAIL;

@RequiredArgsConstructor
@Service
public class MountainService {

    private static final Pattern PARENTHESES = Pattern.compile("[\\[\\]]");
    private static final int MOUNTAIN_LIST_RESPONSE_SIZE = 10;
    private static final String NAME = "name";
    private static final String HEIGHT = "height";
    private static final String HIGH_HEIGHT = "high-height";
    private static final String LOW_HEIGHT = "low-height";
    private static final String POPULARITY = "popularity";
    private static final String ALL_AREA = "전체";
    private static final String DELETE = "";

    private final MountainRepository mountainRepository;
    private final TrailRepository trailRepository;
    private final MemberRepository memberRepository;

    public List<MountainListResponse> getMountains(String sort, String si, int page) {
        List<Mountain> mountains = null;
        if (si.equals(ALL_AREA)) {
            if (sort.equals(NAME)) {
                mountains = mountainRepository.findAll(PageRequest.of(page, MOUNTAIN_LIST_RESPONSE_SIZE)).getContent();
            } else if (sort.equals(HIGH_HEIGHT)) {
                mountains = mountainRepository.findAll(PageRequest.of(page, MOUNTAIN_LIST_RESPONSE_SIZE, Sort.by(HEIGHT).descending())).getContent();
            } else if (sort.equals(LOW_HEIGHT)) {
                mountains = mountainRepository.findMountainsExceptZeroHeight(page * MOUNTAIN_LIST_RESPONSE_SIZE, MOUNTAIN_LIST_RESPONSE_SIZE);
            } else if (sort.equals(POPULARITY)) {
                mountains = mountainRepository.findAllPopularity(page * MOUNTAIN_LIST_RESPONSE_SIZE, MOUNTAIN_LIST_RESPONSE_SIZE);
            }
        } else {
            if (sort.equals(NAME)) {
                mountains = mountainRepository.findMountainsFilterBySiOrderByName(page * MOUNTAIN_LIST_RESPONSE_SIZE, MOUNTAIN_LIST_RESPONSE_SIZE, si);
            } else if (sort.equals(HIGH_HEIGHT)) {
                mountains = mountainRepository.findMountainsFilterBySiOrderByHeightDesc(page * MOUNTAIN_LIST_RESPONSE_SIZE, MOUNTAIN_LIST_RESPONSE_SIZE, si);
            } else if (sort.equals(LOW_HEIGHT)) {
                mountains = mountainRepository.findMountainsFilterBySiExceptZeroHeight(page * MOUNTAIN_LIST_RESPONSE_SIZE, MOUNTAIN_LIST_RESPONSE_SIZE, si);
            } else if (sort.equals(POPULARITY)) {
                mountains = mountainRepository.findMountainsFilteredBySiOrderByPopularityDesc(page * MOUNTAIN_LIST_RESPONSE_SIZE, MOUNTAIN_LIST_RESPONSE_SIZE, si);
            }

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
                                .goingUpTime(trail.getGoingUpTime())
                                .goingDownTime(trail.getGoingDownTime())
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

    public List<MountainListResponse> searchMountain(String keyword, String sort, String si) {
        List<Mountain> mountains;
        if (si.equals(ALL_AREA)) {
            if (sort.equals(POPULARITY)) {
                mountains = mountainRepository.findMountainsOrderByPopularityDesc(keyword);
            } else if (sort.equals(LOW_HEIGHT)) {
                mountains = mountainRepository.findBySearchMountainExceptZeroHeight(keyword);
                mountains.sort(Comparator.comparing(Mountain::getHeight));
            } else {
                mountains = mountainRepository.findBySearchMountain(keyword);
                if (sort.equals(NAME)) {
                    mountains.sort(Comparator.comparing(Mountain::getName));
                } else if (sort.equals(HIGH_HEIGHT)) {
                    mountains.sort(Comparator.comparing(Mountain::getHeight).reversed());
                }
            }
        } else {
            if (sort.equals(POPULARITY)) {
                mountains = mountainRepository.findFilteredMountainsOrderByPopularityDesc(keyword, si);
            } else if (sort.equals(LOW_HEIGHT)) {
                mountains = mountainRepository.findBySearchMountainAndFilterBySiExceptZeroHeight(keyword, si);
                mountains.sort(Comparator.comparing(Mountain::getHeight));
            } else {
                mountains = mountainRepository.findBySearchMountainAndFilterBySi(keyword, si);
                if (sort.equals(NAME)) {
                    mountains.sort(Comparator.comparing(Mountain::getName));
                } else if (sort.equals(HIGH_HEIGHT)) {
                    mountains.sort(Comparator.comparing(Mountain::getHeight).reversed());
                }
            }
        }
        return getMountainListResponses(mountains);
    }

    public List<MountainListResponse> searchTrail(String keyword, String sort, String si) {
        List<Mountain> mountains;
        if (si.equals(ALL_AREA)) {
            if (sort.equals(POPULARITY)) {
                mountains = mountainRepository.findBySearchTrailOrderByPopularityDesc(keyword);
            } else if (sort.equals(LOW_HEIGHT)) {
                mountains = mountainRepository.findBySearchTrailExceptZeroHeight(keyword);
                mountains.sort(Comparator.comparing(Mountain::getHeight));
            } else {
                mountains = mountainRepository.findBySearchTrail(keyword);
                if (sort.equals(NAME)) {
                    mountains.sort(Comparator.comparing(Mountain::getName));
                } else if (sort.equals(HIGH_HEIGHT)) {
                    mountains.sort(Comparator.comparing(Mountain::getHeight).reversed());
                }
            }
        } else {
            if (sort.equals(POPULARITY)) {
                mountains = mountainRepository.findFilteredMountainsBySearchTrailOrderByPopularityDesc(keyword, si);
            } else if (sort.equals(LOW_HEIGHT)) {
                mountains = mountainRepository.findBySearchTrailAndFilterBySiExceptZeroHeight(keyword, si);
                mountains.sort(Comparator.comparing(Mountain::getHeight));
            } else {
                mountains = mountainRepository.findBySearchTrailAndFilterBySi(keyword, si);
                if (sort.equals(NAME)) {
                    mountains.sort(Comparator.comparing(Mountain::getName));
                } else if (sort.equals(HIGH_HEIGHT)) {
                    mountains.sort(Comparator.comparing(Mountain::getHeight).reversed());
                }
            }
        }
        return getMountainListResponses(mountains);
    }

    public RecommendationListResponse getRecommendedTrails(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
        List<Hiking> hikings = member.getHikings();

        List<RecommendationResponse> memberBased = null;
        List<RecommendationResponse> lastVisitedTrailBased = null;
        List<RecommendationResponse> surveyBased = null;
        if (hikings.size() > 0) {
            Trail trail = trailRepository.findById(hikings.get(hikings.size() - 1).getTrail().getId())
                    .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_TRAIL));
            memberBased = member.getMemberBasedRecommendations()
                    .stream()
                    .map(MemberBasedRecommendation::getTrail)
                    .map(this::getRecommendationResponse)
                    .collect(Collectors.toList());

            try {
                URL url = new URL("https://j7b201.p.ssafy.io/recommendation/visited-trail-based/" + trail.getId());
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setDoOutput(true);
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
                String[] recommendedTrailIds = PARENTHESES.matcher(bufferedReader.readLine()).replaceAll(DELETE).split(",");
                lastVisitedTrailBased = Arrays.stream(recommendedTrailIds)
                        .mapToInt(Integer::parseInt)
                        .mapToObj(recommendedTrailId -> trailRepository.findById(recommendedTrailId)
                                .orElseThrow(() -> new NotFoundException(NOT_FOUND_TRAIL)))
                        .map(this::getRecommendationResponse)
                        .collect(Collectors.toList());
            } catch (IOException e) {
                e.printStackTrace();
                throw new NotFoundException(ErrorMessage.FAIL_TO_GET_TRAILS);
            }
        } else {
            surveyBased = member.getSurveyBasedRecommendations()
                    .stream()
                    .map(SurveyBasedRecommendation::getTrail)
                    .map(this::getRecommendationResponse)
                    .collect(Collectors.toList());
        }
        return getRecommendationListResponse(memberBased, lastVisitedTrailBased, surveyBased);
    }

    private RecommendationListResponse getRecommendationListResponse(List<RecommendationResponse> memberBased, List<RecommendationResponse> lastVisitedTrailBased, List<RecommendationResponse> surveyBased) {
        return RecommendationListResponse.builder()
                .memberBased(memberBased)
                .lastVisitedTrailBased(lastVisitedTrailBased)
                .surveyBased(surveyBased)
                .build();
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

    private RecommendationResponse getRecommendationResponse(Trail recommendedTrail) {
        return RecommendationResponse.builder()
                .mountainId(recommendedTrail.getMountain().getId())
                .trailName(recommendedTrail.getName())
                .mountainName(recommendedTrail.getMountain().getName())
                .mountainImage(recommendedTrail.getMountain().getImageUrl())
                .build();
    }
}
