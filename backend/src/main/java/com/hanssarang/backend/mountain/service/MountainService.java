package com.hanssarang.backend.mountain.service;

import com.hanssarang.backend.mountain.controller.dto.MountainListResponse;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
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
