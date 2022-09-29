package com.hanssarang.backend.member.service;

import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.exception.BadRequestException;
import com.hanssarang.backend.common.exception.DuplicationException;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.member.controller.dto.*;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.survey.controller.dto.CreateSurveyRequest;
import com.hanssarang.backend.survey.domain.Survey;
import com.hanssarang.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.hanssarang.backend.common.domain.ErrorMessage.*;

@RequiredArgsConstructor
@Service
public class MemberService {

    private static final char[] CHAR_SET = new char[]{
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '!', '@', '#', '$', '%', '^', '&', '*'};

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    public void checkEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new DuplicationException(FAIL_TO_CHECK_EMAIL);
        }
    }

    public void checkNickname(String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new DuplicationException(FAIL_TO_CHECK_NICKNAME);
        }
    }

    public void signUp(SignUpRequest signUpRequest) {
        Member member = Member.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .name(signUpRequest.getName())
                .birth(signUpRequest.getBirth())
                .phone(signUpRequest.getPhone())
                .nickname(signUpRequest.getNickname())
                .address(Address.builder()
                        .si(signUpRequest.getAddress().getSi())
                        .gu(signUpRequest.getAddress().getGu())
                        .dong(signUpRequest.getAddress().getDong())
                        .build())
                .isActive(true)
                .build();
        memberRepository.save(member);
    }

    public void createInitialSurvey(int memberId, InitialSurveyRequest initialSurveyRequest) {
    }

    public EmailResponse getMemberEmail(FindingEmailRequest findingEmailRequest) {
        Member member = memberRepository.findByNameAndBirthAndPhoneAndIsActiveTrue(
                        findingEmailRequest.getName(),
                        findingEmailRequest.getBirth(),
                        findingEmailRequest.getPhone())
                .orElseThrow(() -> new NotFoundException(FAIL_TO_FIND_EMAIL));
        return EmailResponse.builder()
                .email(member.getEmail())
                .build();
    }

    public MemberResponse getMember(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        return MemberResponse.builder()
                .email(member.getEmail())
                .name(member.getName())
                .birth(member.getBirth())
                .phone(member.getPhone())
                .address(member.getAddress().getFullAddress())
                .nickname(member.getNickname())
                .imageUrl(member.getImageUrl())
                .build();
    }

    public UpdateResponse updateMember(int memberId, UpdateRequest updateRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        member.update(updateRequest.getName(), updateRequest.getPhone(), updateRequest.getAddress(), updateRequest.getNickname(), updateRequest.getImageUrl());
        memberRepository.save(member);
        return UpdateResponse.builder()
                .nickname(member.getNickname())
                .imageUrl(member.getImageUrl())
                .token(JwtUtil.generateToken(memberId, member.getNickname()))
                .build();
    }

    public void updatePassword(PasswordUpdateVerificationRequest passwordUpdateVerificationRequest) {
        Member member = memberRepository.findByEmailAndNameAndIsActiveTrue(passwordUpdateVerificationRequest.getEmail(), passwordUpdateVerificationRequest.getName())
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        String newPassword = createPassword();
        member.updatePassword(passwordEncoder, newPassword);
        // 이메일 전송
    }

    public void updatePasswordInMyPage(int memberId, PasswordUpdateRequest passwordUpdateRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        member.updatePassword(passwordEncoder, passwordUpdateRequest.getPassword());
        memberRepository.save(member);
    }

    public void deleteMember(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        member.delete();
        memberRepository.save(member);
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Member member = memberRepository.findByEmailAndIsActiveTrue(loginRequest.getEmail())
                .orElseThrow(() -> new NotFoundException(FAIL_TO_LOGIN));
        if (!passwordEncoder.matches(loginRequest.getPassword(), member.getPassword())) {
            throw new BadRequestException(FAIL_TO_LOGIN);
        }
        return LoginResponse.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .imageUrl(member.getImageUrl())
                .isCompletedSurvey(member.isCompletedSurvey())
                .token(JwtUtil.generateToken(member.getId(), member.getNickname()))
                .build();
    }

    private String createPassword() {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            stringBuilder.append(CHAR_SET[(int) (CHAR_SET.length * Math.random())]);
        }
        return stringBuilder.toString();
    }

    public void createSurvey(int memberId, CreateSurveyRequest createSurveyRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBER));
        Survey survey = Survey.builder()
                .level(createSurveyRequest.getLevel())
                .preferredMountainLocation(createSurveyRequest.getPreferredMountainLocation())
                .preferredHikingStyle(createSurveyRequest.getPreferredHikingStyle())
                .preferredHikingTime(createSurveyRequest.getPreferredHikingTime())
                .isActive(true)
                .member(member)
                .build();
        member.submit(survey);
        memberRepository.save(member);
    }
}
