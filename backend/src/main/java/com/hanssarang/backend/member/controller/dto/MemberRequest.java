package com.hanssarang.backend.member.controller.dto;

import com.hanssarang.backend.common.domain.Address;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRequest {

    private String name;
    private String phone;
    private Address address;
    private String nickname;
    private String profilePicture;
}
