package com.hanssarang.backend.common.domain;

import lombok.*;

import javax.persistence.Embeddable;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Address {

    private String si;
    private String gu;
    private String dong;
}
