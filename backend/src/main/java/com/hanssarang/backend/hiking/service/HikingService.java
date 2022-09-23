package com.hanssarang.backend.hiking.service;

import com.hanssarang.backend.hiking.controller.dto.HikingListResponse;
import com.hanssarang.backend.hiking.controller.dto.HikingRequest;
import com.hanssarang.backend.hiking.controller.dto.HikingResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HikingService {

    public List<HikingListResponse> getHikings(int memberId) {
        return null;
    }

    public HikingResponse getHiking(int hikingId) {
        return null;
    }

    public List<HikingListResponse> getCompletedHikings(int memberId) {
        return null;
    }

    public void createHiking(int memberId, HikingRequest hikingRequest) {
    }
}
