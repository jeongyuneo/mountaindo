package com.hanssarang.backend.hiking.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HikingRepository extends JpaRepository<Hiking, Integer> {

    @Query(value = "select * " +
            "from hiking " +
            "where member_id = :memberId " +
            "order by created_date desc", nativeQuery = true)
    List<Hiking> findAllHikings(int memberId);
}
