package com.hanssarang.backend.member.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UpdateRequest {

    private String name;
    private String phone;
    private String address;
    private String nickname;
    private String profilePicture;
}
