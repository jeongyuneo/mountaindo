package com.hanssarang.backend.member.domain;

import com.hanssarang.backend.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "survey_id"))
@Entity
public class Survey extends BaseEntity {

    @NotNull
    private int level;

    @NotNull
    private int preferredMountainLocation;

    @NotNull
    private int preferredHikingStyle;

    @NotNull
    private int preferredHikingTime;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void submit(Member member) {
        this.member = member;
    }
}
