package com.hanssarang.backend.member.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberRequest {

    private String name;
    private String phoneNumber;
    private String address;
    private String nickName;
    private String profilePicture;

}
