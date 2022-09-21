package com.hanssarang.backend.mountain.service;

import com.hanssarang.backend.mountain.controller.dto.MountainListResponse;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.controller.dto.TrailResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MountainService {

    public List<MountainListResponse> getMountains(String sort) {
        return null;
    }

    public MountainResponse getMountain(int mountainId) {
        return null;
    }

    public TrailResponse getTrail(int trailId) {
        return null;
    }

    public List<MountainListResponse> searchMountainOrTrail(String keyword) {
        return null;
    }

    public List<MountainListResponse> searchMountain(String keyword) {
        return null;
    }

    public List<MountainListResponse> searchTrail(String keyword) {
        return null;
    }
}
