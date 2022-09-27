package com.hanssarang.backend.hiking.domain;

import com.hanssarang.backend.common.domain.BaseEntity;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.mountain.domain.Trail;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalTime;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "hiking_id"))
@Entity
public class Hiking extends BaseEntity {

    private double distance;
    private LocalTime useTime;
    private double accumulatedHeight;
    private boolean isCompleted;

    private String path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trail_id")
    private Trail trail;
}
