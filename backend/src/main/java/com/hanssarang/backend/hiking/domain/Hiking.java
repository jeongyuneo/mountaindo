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
import javax.validation.constraints.NotNull;
import java.time.LocalTime;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "hiking_id"))
@Entity
public class Hiking extends BaseEntity {

    @NotNull
    private double distance;

    @NotNull
    private LocalTime useTime;

    @NotNull
    private double accumulatedHeight;

    @NotNull
    private boolean isCompleted;

    @NotNull
    private String path;

    @NotNull
    private String imageUrl;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trail_id")
    private Trail trail;

    public void addMember(Member member) {
        this.member = member;
    }
}
