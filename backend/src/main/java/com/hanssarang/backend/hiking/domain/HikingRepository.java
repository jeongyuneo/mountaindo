package com.hanssarang.backend.hiking.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HikingRepository extends JpaRepository<Hiking, Integer> {

    @Query(value = "select * " +
            "from hiking " +
            "where member_id = :memberId " +
            "and created_date in (select max(created_date) from hiking group by trail_id) " +
            "order by created_date desc", nativeQuery = true)
    List<Hiking> findAllHikings(int memberId);
}
