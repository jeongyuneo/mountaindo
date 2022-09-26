package com.hanssarang.backend.member.domain;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.BaseEntity;
import com.hanssarang.backend.hiking.domain.Hiking;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "member_id"))
@Entity
public class Member extends BaseEntity {

    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private String phone;
    private String nickname;
    private String imageUrl;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Hiking> hikings;

    public void updatePassword(PasswordEncoder passwordEncoder, String newPassword) {
        this.password = passwordEncoder.encode(newPassword);
    }

    public void update(String name, String phone, Address address, String nickname, String imageUrl) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
