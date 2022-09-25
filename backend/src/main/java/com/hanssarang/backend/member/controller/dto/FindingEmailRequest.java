package com.hanssarang.backend.member.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FindingEmailRequest {

    private String name;
    private LocalDate birth;
    private String phone;
}
