package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "mountain_ic"))
@Entity
public class Mountain extends BaseEntity {

    private String name;
    private String code;
    private double height;
    private String imageUrl;

    @Embedded
    private Address address;

    @Builder
    public Mountain(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive,
                    String name, String code, int height, String imageUrl, Address address) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.name = name;
        this.code = code;
        this.height = height;
        this.imageUrl = imageUrl;
        this.address = address;
    }
}
