package com.hanssarang.backend.hiking.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HikingRepository extends JpaRepository<Hiking, Integer> {
}
