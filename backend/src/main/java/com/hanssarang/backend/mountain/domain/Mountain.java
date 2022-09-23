package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "mountain_id"))
@Entity
public class Mountain extends BaseEntity {

    private String name;
    private String code;
    private double height;
    private String imageUrl;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "mountain", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Trail> trail;

    @Builder
    public Mountain(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive,
                    String name, String code, double height, String imageUrl, Address address, List<Trail> trail) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.name = name;
        this.code = code;
        this.height = height;
        this.imageUrl = imageUrl;
        this.address = address;
        this.trail = trail;
    }
}
