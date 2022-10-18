package com.hanssarang.backend.member.controller.dto;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.member.domain.Member;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SignUpRequest {

    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private String phone;
    private Address address;
    private String nickname;

    public Member toEntity(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .birth(birth)
                .phone(phone)
                .nickname(nickname)
                .address(Address.builder()
                        .si(address.getSi())
                        .gu(address.getGu())
                        .dong(address.getDong())
                        .build())
                .isActive(true)
                .build();
    }
}
