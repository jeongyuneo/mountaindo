package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
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
    private List<Trail> trails;
}
