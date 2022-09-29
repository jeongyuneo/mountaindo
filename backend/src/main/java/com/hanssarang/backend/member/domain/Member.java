package com.hanssarang.backend.member.domain;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.BaseEntity;
import com.hanssarang.backend.hiking.domain.Hiking;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
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

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Hiking> hikings = new ArrayList<>();

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

    public int getAccumulatedHeight() {
        return (int) hikings.stream()
                .mapToDouble(Hiking::getAccumulatedHeight)
                .sum();
    }

    public int getAccumulatedHeightInMountain(int mountainId) {
        return (int) hikings.stream()
                .filter(hiking -> hiking.getTrail().getMountain().getId() == mountainId)
                .mapToDouble(Hiking::getAccumulatedHeight)
                .sum();
    }

    public void addHiking(Hiking hiking) {
        hikings.add(hiking);
        hiking.addMember(this);
    }
}
