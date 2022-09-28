package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.common.domain.BaseEntity;
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
@AttributeOverride(name = "id", column = @Column(name = "trail_id"))
@Entity
public class Trail extends BaseEntity {

    private String name;
    private double length;
    private LocalTime goingUpTime;
    private LocalTime goingDownTime;
    private String risk;

    @Enumerated(value = EnumType.STRING)
    private Level level;

    private String path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mountain_id")
    private Mountain mountain;
}
