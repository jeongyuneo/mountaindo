package com.hanssarang.backend.member.domain;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.BaseEntity;
import com.hanssarang.backend.hiking.domain.Hiking;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
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

    @Builder
    public Member(int id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive,
                  String email, String password, String name, LocalDate birth, String phone, String nickname, String imageUrl, Address address) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.phone = phone;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.address = address;
    }

    public void updatePassword(PasswordEncoder passwordEncoder, String newPassword) {
        this.password = passwordEncoder.encode(newPassword);
    }
}
