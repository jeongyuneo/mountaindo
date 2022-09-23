package com.hanssarang.backend.mountain.repository;

import com.hanssarang.backend.mountain.domain.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MountainRepository extends JpaRepository<Mountain, Long> {
}
