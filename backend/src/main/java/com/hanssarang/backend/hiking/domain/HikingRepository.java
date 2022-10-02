package com.hanssarang.backend.hiking.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HikingRepository extends JpaRepository<Hiking, Integer> {
    Optional<Hiking> findByIdAndMemberId(int hikingId, int memberId);
}
