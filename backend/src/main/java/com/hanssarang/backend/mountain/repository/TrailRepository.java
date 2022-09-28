package com.hanssarang.backend.mountain.repository;

import com.hanssarang.backend.mountain.domain.Trail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrailRepository extends JpaRepository<Trail, Integer> {
}
