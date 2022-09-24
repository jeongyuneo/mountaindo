package com.hanssarang.backend.member.controller.dto;

import com.hanssarang.backend.common.domain.Address;
import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberResponse {

    private String email;
    private String name;
    private LocalDate birth;
    private String phone;
    private Address address;
    private String nickname;
    private String imageUrl;
}
