package com.hanssarang.backend.survey.domain;

import com.hanssarang.backend.common.domain.BaseEntity;
import com.hanssarang.backend.member.domain.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "survey_id"))
@Entity
public class Survey extends BaseEntity {

    private int level;
    private int preferredMountainLocation;
    private int preferredHikingStyle;
    private int preferredHikingTime;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void submit(Member member) {
        this.member = member;
    }
}
