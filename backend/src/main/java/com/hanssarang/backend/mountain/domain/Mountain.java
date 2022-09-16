package com.hanssarang.backend.mountain.domain;

import com.hanssarang.backend.trail.domain.Trail;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Mountain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mountainId;

    @NotNull
    private String name;

    private String code;

    private int height;

    private String address;

    private String imageUrl;

    @OneToMany(mappedBy = "trail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Trail> trails = new ArrayList<>();
}
