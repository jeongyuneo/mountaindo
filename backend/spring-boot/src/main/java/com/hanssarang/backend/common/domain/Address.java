package com.hanssarang.backend.common.domain;

import lombok.*;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Embeddable;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
@Access(AccessType.FIELD)
public class Address {

    private String si;
    private String gu;
    private String dong;

    public String getFullAddress() {
        return new StringBuilder()
                .append(si)
                .append(" ")
                .append(gu)
                .append(" ")
                .append(dong)
                .toString();
    }
}
