package com.hanssarang.backend.mountain.service;

import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MountainService {

    private final MountainRepository mountainRepository;

    public List<MountainResponse> getMountains() {
        List<Mountain> mountains = mountainRepository.findAll();
        return mountains.stream()
                .map(mountain -> MountainResponse.builder()
                        .mountainId(mountain.getMountainId())
                        .name(mountain.getName())
                        .height(mountain.getHeight())
                        .address(mountain.getAddress())
                        .imageUrl(mountain.getImageUrl())
                        .build())
                .collect(Collectors.toList());
    }

    public MountainResponse getMountain(int mountainId) {
        MountainResponse mountainResponse = MountainResponse.builder()
                .mountainId(1)
                .name("북한산")
                .height(836)
                .address("서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구, 경기도 고양시ㆍ양주시")
                .imageUrl("http://www.forest.go.kr/newkfsweb/cmm/fms/getImage.do?fileSn=1&atchFileId=FILE_000000000424203")
                .build();
        return mountainResponse;
    }

    public MountainResponse searchMountain(String name) {
        return null;
    }
}
