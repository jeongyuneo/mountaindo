package com.hanssarang.backend.mountain.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MountainRepository extends JpaRepository<Mountain, Integer> {

    @Query(value = "select m.* " +
            "from mountain m " +
            "left join (select h.trail_id, count(h.trail_id) count, t.mountain_id " +
            "            from hiking h " +
            "            right join trail t " +
            "            on t.trail_id = h.trail_id " +
            "            group by t.mountain_id) v " +
            "on m.mountain_id = v.mountain_id " +
            "group by m.mountain_id " +
            "having sum(v.count) " +
            "order by v.count desc " +
            "limit :limit " +
            "offset :offset", nativeQuery = true)
    List<Mountain> findAllPopularity(int offset, int limit);

    @Query(value = "select m.* " +
            "from mountain m " +
            "left join (select h.trail_id, count(h.trail_id) count, t.mountain_id " +
            "            from hiking h " +
            "            inner join trail t " +
            "            on t.trail_id = h.trail_id " +
            "            group by t.trail_id) v " +
            "on m.mountain_id = v.mountain_id " +
            "group by m.mountain_id " +
            "having sum(v.count) " +
            "limit 10", nativeQuery = true)
    List<Mountain> findIsHot();

    List<Mountain> findByNameContaining(String keyword);

    @Query(value = "select m.* " +
            "from mountain m " +
            "inner join (select distinct t.mountain_id " +
            "            from trail t " +
            "            where t.name like concat('%',:keyword,'%') " +
            "            and t.mountain_id is not null) v " +
            "on m.mountain_id = v.mountain_id", nativeQuery = true)
    List<Mountain> findByTrailNameContaining(@Param("keyword") String keyword);

    @Query(value = "select * " +
            "from mountain " +
            "where si like concat('%',:si,'%')", nativeQuery = true)
    List<Mountain> findBySi(String si);
}
