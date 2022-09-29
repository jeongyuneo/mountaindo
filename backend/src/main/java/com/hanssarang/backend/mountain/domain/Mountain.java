package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.BaseEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "mountain_id"))
@EqualsAndHashCode
@Entity
public class Mountain extends BaseEntity {

    private String name;
    private String code;
    private double height;
    private String imageUrl;

    @Embedded
    private Address address;

    @Builder.Default
    @OneToMany(mappedBy = "mountain", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Trail> trails = new ArrayList<>();
}
