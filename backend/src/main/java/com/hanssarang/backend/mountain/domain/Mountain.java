package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.BaseEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@EqualsAndHashCode(callSuper = false)
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "mountain_id"))
@Entity
public class Mountain extends BaseEntity {

    @NotNull
    private String name;

    @Column(nullable = false, unique = true)
    private String code;

    @NotNull
    private double height;

    @NotNull
    private String imageUrl;

    @NotNull
    @Embedded
    private Address address;

    @Builder.Default
    @OneToMany(mappedBy = "mountain", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Trail> trails = new ArrayList<>();
}
