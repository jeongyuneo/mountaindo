package com.hanssarang.backend.survey.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Integer> {

    boolean existsByMemberId(int id);
}
