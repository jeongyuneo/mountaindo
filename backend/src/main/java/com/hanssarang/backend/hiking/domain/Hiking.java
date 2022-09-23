package com.hanssarang.backend.hiking.domain;

import com.hanssarang.backend.common.domain.BaseEntity;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.mountain.domain.Trail;
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
@AttributeOverride(name = "id", column = @Column(name = "hiking_id"))
@Entity
public class Hiking extends BaseEntity {

    private double distance;
    private LocalTime useTime;
    private double accumulatedHeight;
    private boolean isCompleted;

    @Column(nullable = false, columnDefinition = "geometry")
    private LineString path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trail_id")
    private Trail trail;

    @Builder
    public Hiking(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive,
                  double distance, LocalTime useTime, double accumulatedHeight, boolean isCompleted, LineString path, Member member, Trail trail) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.distance = distance;
        this.useTime = useTime;
        this.accumulatedHeight = accumulatedHeight;
        this.isCompleted = isCompleted;
        this.path = path;
        this.member = member;
        this.trail = trail;
    }
}
