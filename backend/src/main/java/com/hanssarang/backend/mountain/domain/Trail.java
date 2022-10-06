package com.hanssarang.backend.mountain.domain;

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
@AttributeOverride(name = "id", column = @Column(name = "trail_id"))
@Entity
public class Trail extends BaseEntity {

    @NotNull
    private String name;

    @NotNull
    private double length;

    @NotNull
    private int goingUpTime;

    @NotNull
    private int goingDownTime;

    private String risk;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Level level;

    @NotNull
    private String path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mountain_id")
    private Mountain mountain;
}
