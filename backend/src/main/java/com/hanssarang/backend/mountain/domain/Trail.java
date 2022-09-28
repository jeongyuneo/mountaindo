package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "trail_id"))
@Entity
public class Trail extends BaseEntity {

    private String name;
    private double length;
    private int goingUpTime;
    private int goingDownTime;
    private String risk;

    @Enumerated(value = EnumType.STRING)
    private Level level;

    @Column(nullable = false, columnDefinition = "geometry")
    private String path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mountain_id")
    private Mountain mountain;
}
