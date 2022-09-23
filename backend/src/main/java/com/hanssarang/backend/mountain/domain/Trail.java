package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.geolatte.geom.LineString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
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

    @Column(nullable = false, columnDefinition = "geometry")
    private LineString path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mountain_id")
    private Mountain mountain;

    @Builder
    public Trail(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive,
                 String name, int length, LocalTime goingUpTime, LocalTime goingDownTime, String risk, Level level, LineString path, Mountain mountain) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.name = name;
        this.length = length;
        this.goingUpTime = goingUpTime;
        this.goingDownTime = goingDownTime;
        this.risk = risk;
        this.level = level;
        this.path = path;
        this.mountain = mountain;
    }
}
