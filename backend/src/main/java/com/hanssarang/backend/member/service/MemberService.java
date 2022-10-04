package com.hanssarang.backend.member.service;

import com.hanssarang.backend.common.domain.ErrorMessage;
import com.hanssarang.backend.common.exception.BadRequestException;
import com.hanssarang.backend.common.exception.DuplicationException;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.member.controller.dto.*;
import com.hanssarang.backend.member.domain.Member;
import com.hanssarang.backend.member.domain.MemberRepository;
import com.hanssarang.backend.member.domain.Survey;
import com.hanssarang.backend.util.ImageUtil;
import com.hanssarang.backend.util.JwtUtil;
import com.hanssarang.backend.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.hanssarang.backend.common.domain.ErrorMessage.DUPLICATED_EMAIL;

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
    private static final String ADMIN_EMAIL = "mountaindo201@naver.com";
    private static final String JOIN_MOUNTAINDO_MESSAGE = "MountainDo: 회원가입 인증번호 안내";
    private static final String CERTIFICATION_NUMBER_MESSAGE = "인증번호: ";
    private static final String CONFIRMATION_NUMBER = "\n해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
    private static final String ISSUANCE_OF_TEMPORARY_PASSWORD = "MountainDo: 임시 비밀번호 발급";
    private static final String TEMPORARY_PASSWORD = "임시 비밀번호: ";
    private static final String LOGIN_WITH_TEMPORARY_PASSWORD = "\n임시 비밀번호로 로그인 후 비밀번호를 변경 부탁드립니다.";
    private static final String PROFILE = "profile";

    private final JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    public void checkEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new DuplicationException(DUPLICATED_EMAIL);
        }
    }

    public void checkNickname(String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new DuplicationException(ErrorMessage.DUPLICATED_NICKNAME);
        }
    }

    public SignUpResponse signUp(SignUpRequest signUpRequest) {
        Member member = signUpRequest.toEntity(passwordEncoder);
        memberRepository.save(member);
        return SignUpResponse.builder()
                .token(JwtUtil.generateToken(member.getId(), member.getNickname()))
                .build();
    }

    public void createSurvey(int memberId, SurveyRequest surveyRequest) {
        Member member = findMember(memberId);
        Survey survey = Survey.builder()
                .level(surveyRequest.getLevel())
                .preferredMountainLocation(surveyRequest.getPreferredMountainLocation())
                .preferredHikingStyle(surveyRequest.getPreferredHikingStyle())
                .preferredHikingTime(surveyRequest.getPreferredHikingTime())
                .isActive(true)
                .build();
        member.submit(survey);
        memberRepository.save(member);
    }

    public EmailResponse getMemberEmail(FindingEmailRequest findingEmailRequest) {
        Member member = memberRepository.findByNameAndBirthAndPhoneAndIsActiveTrue(
                        findingEmailRequest.getName(),
                        findingEmailRequest.getBirth(),
                        findingEmailRequest.getPhone())
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
        return EmailResponse.builder()
                .email(member.getEmail())
                .build();
    }

    public MemberResponse getMember(int memberId) {
        Member member = findMember(memberId);
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

    public UpdateResponse updateMember(int memberId, UpdateRequest updateRequest, MultipartFile multipartFile) {
        Member member = findMember(memberId);
        String imageUrl = ImageUtil.saveImage(multipartFile, PROFILE);
        member.update(updateRequest.getName(), updateRequest.getPhone(), updateRequest.getAddress(), updateRequest.getNickname(), imageUrl);
        memberRepository.save(member);
        return UpdateResponse.builder()
                .nickname(member.getNickname())
                .imageUrl(imageUrl)
                .token(JwtUtil.generateToken(memberId, member.getNickname()))
                .build();
    }

    public void updatePassword(PasswordUpdateVerificationRequest passwordUpdateVerificationRequest) {
        Member member = memberRepository.findByEmailAndNameAndIsActiveTrue(passwordUpdateVerificationRequest.getEmail(), passwordUpdateVerificationRequest.getName())
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
        String newPassword = createRandomString();
        member.updatePassword(passwordEncoder, newPassword);
        memberRepository.save(member);
        sendMailMessage(member.getEmail(), ISSUANCE_OF_TEMPORARY_PASSWORD,
                TEMPORARY_PASSWORD + newPassword + LOGIN_WITH_TEMPORARY_PASSWORD);
    }

    public void updatePasswordInMyPage(int memberId, PasswordUpdateRequest passwordUpdateRequest) {
        Member member = findMember(memberId);
        validatePassword(member, passwordUpdateRequest.getPassword());
        member.updatePassword(passwordEncoder, passwordUpdateRequest.getNewPassword());
        memberRepository.save(member);
    }

    public void deleteMember(int memberId) {
        Member member = findMember(memberId);
        member.delete();
        memberRepository.save(member);
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Member member = memberRepository.findByEmailAndIsActiveTrue(loginRequest.getEmail())
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
        validatePassword(member, loginRequest.getPassword());
        return LoginResponse.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .isCompletedSurvey(member.isCompletedSurvey())
                .token(JwtUtil.generateToken(member.getId(), member.getNickname()))
                .build();
    }

    public void sendEmailValidationToken(VerificationNumberBySendingEmailRequest verificationNumberBySendingEmailRequest) {
        String emailValidateToken = createRandomString();
        RedisUtil.setDataExpired(verificationNumberBySendingEmailRequest.getEmail(), emailValidateToken, 60 * 3L);
        sendMailMessage(verificationNumberBySendingEmailRequest.getEmail(), JOIN_MOUNTAINDO_MESSAGE,
                CERTIFICATION_NUMBER_MESSAGE + emailValidateToken + CONFIRMATION_NUMBER);
    }

    public void validateSignUpEmail(EmailAuthRequest emailAuthRequest) {
        RedisUtil.validateData(emailAuthRequest.getEmail(), emailAuthRequest.getAuthToken());
    }

    private Member findMember(int memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private String createRandomString() {
        return IntStream.range(0, 10)
                .mapToObj(i -> String.valueOf(CHAR_SET[(int) (Math.random() * (CHAR_SET.length))]))
                .collect(Collectors.joining());
    }

    private void validatePassword(Member member, String password) {
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new BadRequestException(ErrorMessage.NOT_EQUAL_PASSWORD);
        }
    }

    private void sendMailMessage(String email, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(ADMIN_EMAIL);
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        javaMailSender.send(simpleMailMessage);
    }
}
