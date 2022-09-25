package com.hanssarang.backend.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByNameAndBirthAndPhoneAndIsActiveTrue(String name, LocalDate birth, String phone);

    Optional<Member> findByEmailAndNameAndIsActiveTrue(String email, String name);

    Optional<Member> findByEmailAndIsActiveTrue(String email);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
}
