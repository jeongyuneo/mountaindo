package com.hanssarang.backend.member.controller;

import com.hanssarang.backend.ApiDocument;
import com.hanssarang.backend.common.domain.Address;
import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.common.exception.DuplicationException;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.member.controller.dto.*;
import com.hanssarang.backend.member.service.MemberService;
import com.hanssarang.backend.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

import static com.hanssarang.backend.common.domain.ErrorMessage.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
public class MemberControllerTest extends ApiDocument {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final int ID = 9;
    private static final String EMAIL = "ssafy@samsung.com";
    private static final String PASSWORD = "1q2w3e4r";
    private static final String NAME = "이재용";
    private static final LocalDate BIRTH = LocalDate.now();
    private static final String PHONE = "010-3333-3333";
    private static final Address ADDRESS = Address.builder().si("경기도").gu("수원시").dong("영통구").build();
    private static final String NICKNAME = "나는 부회장";
    private static final String IMAGE_URL = "{image url}";
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, NICKNAME);
    private static final int LEVEL = 1;
    private static final int PREFERRED_MOUNTAIN_LOCATION = 2;
    private static final int PREFERRED_HIKING_STYLE = 2;
    private static final int PREFERRED_HIKING_TIME = 1;

    private MemberResponse memberResponse;
    private UpdateRequest updateRequest;
    private UpdateResponse updateResponse;
    private PasswordUpdateRequest passwordUpdateRequest;
    private EmailResponse emailResponse;
    private SignUpRequest signUpRequest;
    private SignUpResponse signUpResponse;
    private SurveyRequest surveyRequest;
    private FindingEmailRequest findingEmailRequest;
    private PasswordUpdateVerificationRequest passwordUpdateVerificationRequest;
    private LoginRequest loginRequest;
    private LoginResponse loginResponse;

    @MockBean
    private MemberService memberService;

    @BeforeEach
    void setUp() {
        memberResponse = MemberResponse.builder()
                .email(EMAIL)
                .name(NAME)
                .birth(BIRTH)
                .phone(PHONE)
                .address(ADDRESS.getFullAddress())
                .nickname(NICKNAME)
                .imageUrl(IMAGE_URL)
                .build();
        updateRequest = UpdateRequest.builder()
                .name(NAME)
                .phone(PHONE)
                .address(ADDRESS)
                .nickname(NICKNAME)
                .build();
        updateResponse = UpdateResponse.builder()
                .nickname(NICKNAME)
                .imageUrl(IMAGE_URL)
                .token(ACCESS_TOKEN)
                .build();
        passwordUpdateRequest = PasswordUpdateRequest.builder()
                .password(PASSWORD)
                .newPassword(PASSWORD + PASSWORD)
                .build();
        emailResponse = EmailResponse.builder()
                .email(EMAIL)
                .build();
        signUpRequest = SignUpRequest.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .name(NAME)
                .birth(BIRTH)
                .phone(PHONE)
                .address(ADDRESS)
                .nickname(NICKNAME)
                .build();
        signUpResponse = SignUpResponse.builder()
                .token(JwtUtil.generateToken(ID, NICKNAME))
                .build();
        surveyRequest = SurveyRequest.builder()
                .level(LEVEL)
                .preferredMountainLocation(PREFERRED_MOUNTAIN_LOCATION)
                .preferredHikingStyle(PREFERRED_HIKING_STYLE)
                .preferredHikingTime(PREFERRED_HIKING_TIME)
                .build();
        findingEmailRequest = FindingEmailRequest.builder()
                .name(NAME)
                .birth(BIRTH)
                .phone(PHONE)
                .build();
        passwordUpdateVerificationRequest = PasswordUpdateVerificationRequest.builder()
                .email(EMAIL)
                .name(NAME)
                .build();
        loginRequest = LoginRequest.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .build();
        loginResponse = LoginResponse.builder()
                .memberId(ID)
                .nickname(NICKNAME)
                .imageUrl(IMAGE_URL)
                .token(ACCESS_TOKEN)
                .build();
    }

    @DisplayName("회원 정보 조회 - 성공")
    @Test
    void getMemberSuccess() throws Exception {
        // given
        willReturn(memberResponse).given(memberService).getMember(anyInt());
        // when
        ResultActions resultActions = 회원정보_조회_요청();
        // then
        회원정보_조회_성공(resultActions, memberResponse);
    }

    @DisplayName("회원 정보 조회 - 실패")
    @Test
    void getMemberFail() throws Exception {
        // given
        willThrow(new NotFoundException(NOT_FOUND_MEMBER)).given(memberService).getMember(anyInt());
        // when
        ResultActions resultActions = 회원정보_조회_요청();
        // then
        회원정보_조회_실패(resultActions, new Message(NOT_FOUND_MEMBER));
    }

    @DisplayName("회원정보 수정 - 성공")
    @Test
    void updateMemberSuccess() throws Exception {
        // given
        willReturn(updateResponse).given(memberService).updateMember(anyInt(), any(UpdateRequest.class), any(MultipartFile.class));
        // when
        ResultActions resultActions = 회원정보_수정_요청(updateRequest);
        // then
        회원정보_수정_성공(resultActions, updateResponse);
    }

    @DisplayName("회원정보 수정 - 실패")
    @Test
    void updateMemberFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_UPDATE_MEMBER)).given(memberService).updateMember(anyInt(), any(UpdateRequest.class), any(MultipartFile.class));
        // when
        ResultActions resultActions = 회원정보_수정_요청(updateRequest);
        // then
        회원정보_수정_실패(resultActions, new Message(FAIL_TO_UPDATE_MEMBER));
    }

    @DisplayName("마이페이지에서 비밀번호 재설정 - 성공")
    @Test
    void updatePasswordInMyPageSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).updatePasswordInMyPage(anyInt(), any(PasswordUpdateRequest.class));
        // when
        ResultActions resultActions = 마이페이지_비밀번호_재설정_요청(passwordUpdateRequest);
        // then
        마이페이지_비밀번호_재설정_성공(resultActions);
    }

    @DisplayName("마이페이지에서 비밀번호 재설정 - 실패")
    @Test
    void updatePasswordInMyPageFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_UPDATE_PASSWORD)).given(memberService).updatePasswordInMyPage(anyInt(), any(PasswordUpdateRequest.class));
        // when
        ResultActions resultActions = 마이페이지_비밀번호_재설정_요청(passwordUpdateRequest);
        // then
        마이페이지_비밀번호_재설정_실패(resultActions, new Message(FAIL_TO_UPDATE_PASSWORD));
    }

    @DisplayName("회원탈퇴 - 성공")
    @Test
    void deleteMemberSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).deleteMember(anyInt());
        // when
        ResultActions resultActions = 회원탈퇴_요청();
        // then
        회원탈퇴_성공(resultActions);
    }

    @DisplayName("회원탈퇴 - 실패")
    @Test
    void deleteMemberFail() throws Exception {
        // give
        willThrow(new UnexpectedRollbackException(FAIL_TO_DELETE_MEMBER)).given(memberService).deleteMember(anyInt());
        // when
        ResultActions resultActions = 회원탈퇴_요청();
        // then
        회원탈퇴_실패(resultActions, new Message(FAIL_TO_DELETE_MEMBER));
    }

    @DisplayName("닉네임 중복체크 - 성공")
    @Test
    void checkNicknameSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).checkNickname(anyString());
        // when
        ResultActions resultActions = 닉네임_중복체크_요청(NICKNAME);
        // then
        닉네임_중복체크_성공(resultActions);
    }

    @DisplayName("닉네임 중복체크 - 중복체크 실패")
    @Test
    void checkNicknameFail() throws Exception {
        // given
        willThrow(new DuplicationException(DUPLICATED_NICKNAME)).given(memberService).checkNickname(anyString());
        // when
        ResultActions resultActions = 닉네임_중복체크_요청(NICKNAME);
        // then
        닉네임_중복체크_실패(resultActions, new Message(DUPLICATED_NICKNAME));
    }

    @DisplayName("이메일 중복체크 - 성공")
    @Test
    void checkEmailSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).checkEmail(anyString());
        // when
        ResultActions resultActions = 이메일_중복체크_요청(EMAIL);
        // then
        이메일_중복체크_성공(resultActions);
    }

    @DisplayName("이메일 중복체크 - 중복체크 실패")
    @Test
    void checkEmailFail() throws Exception {
        // given
        willThrow(new DuplicationException(DUPLICATED_EMAIL)).given(memberService).checkEmail(anyString());
        // when
        ResultActions resultActions = 이메일_중복체크_요청(EMAIL);
        // then
        이메일_중복체크_실패(resultActions, new Message(DUPLICATED_EMAIL));
    }

    @DisplayName("회원가입 - 성공")
    @Test
    void signUpSuccess() throws Exception {
        // given
        willReturn(signUpResponse).given(memberService).signUp(any(SignUpRequest.class));
        // when
        ResultActions resultActions = 회원가입_요청(signUpRequest);
        // then
        회원가입_성공(resultActions, signUpResponse);
    }

    @DisplayName("회원가입 - 실패")
    @Test
    void signUpFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_SIGNUP)).given(memberService).signUp(any(SignUpRequest.class));
        // when
        ResultActions resultActions = 회원가입_요청(signUpRequest);
        // then
        회원가입_실패(resultActions, new Message(FAIL_TO_SIGNUP));
    }

    @DisplayName("사전 설문조사 저장 - 성공")
    @Test
    void surveySuccess() throws Exception {
        // given
        willDoNothing().given(memberService).createSurvey(anyInt(), any(SurveyRequest.class));
        // when
        ResultActions resultActions = 사전_설문조사_저장_요청(surveyRequest);
        // then
        사전_설문조사_저장_성공(resultActions);
    }

    @DisplayName("사전 설문조사 저장 - 실패")
    @Test
    void surveyFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_CREATE_SURVEY)).given(memberService).createSurvey(anyInt(), any(SurveyRequest.class));
        // when
        ResultActions resultActions = 사전_설문조사_저장_요청(surveyRequest);
        // then
        사전_설문조사_저장_실패(resultActions, new Message(FAIL_TO_CREATE_SURVEY));
    }

    @DisplayName("아이디 찾기 - 성공")
    @Test
    void getMemberIdSuccess() throws Exception {
        // given
        willReturn(emailResponse).given(memberService).getMemberEmail(any(FindingEmailRequest.class));
        // when
        ResultActions resultActions = 아이디_찾기_요청(findingEmailRequest);
        // then
        아이디_찾기_성공(resultActions, emailResponse);
    }

    @DisplayName("아이디 찾기 - 실패")
    @Test
    void getMemberIdFail() throws Exception {
        // given
        willThrow(new NotFoundException(NOT_FOUND_MEMBER)).given(memberService).getMemberEmail(any(FindingEmailRequest.class));
        // when
        ResultActions resultActions = 아이디_찾기_요청(findingEmailRequest);
        // then
        아이디_찾기_실패(resultActions, new Message(NOT_FOUND_MEMBER));
    }

    @DisplayName("비밀번호 재설정 - 성공")
    @Test
    void updatePasswordSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).updatePassword(any(PasswordUpdateVerificationRequest.class));
        // when
        ResultActions resultActions = 비밀번호_재설정_요청(passwordUpdateVerificationRequest);
        // then
        비밀번호_재설정_성공(resultActions);
    }

    @DisplayName("비밀번호 재설정 - 실패")
    @Test
    void updatePasswordFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_UPDATE_PASSWORD)).given(memberService).updatePassword(any(PasswordUpdateVerificationRequest.class));
        // when
        ResultActions resultActions = 비밀번호_재설정_요청(passwordUpdateVerificationRequest);
        // then
        비밀번호_재설정_실패(resultActions, new Message(FAIL_TO_UPDATE_PASSWORD));
    }

    @DisplayName("로그인 - 성공")
    @Test
    void loginSuccess() throws Exception {
        // given
        willReturn(loginResponse).given(memberService).login(any(LoginRequest.class));
        // when
        ResultActions resultActions = 로그인_요청(loginRequest);
        // then
        로그인_성공(resultActions, loginResponse);
    }

    @DisplayName("로그인 - 실패")
    @Test
    void loginFail() throws Exception {
        // given
        willThrow(new NotFoundException(NOT_FOUND_MEMBER)).given(memberService).login(any(LoginRequest.class));
        // when
        ResultActions resultActions = 로그인_요청(loginRequest);
        // then
        로그인_실패(resultActions, new Message(NOT_FOUND_MEMBER));
    }

    private ResultActions 회원정보_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1/members")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 회원정보_조회_성공(ResultActions resultActions, MemberResponse memberResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(memberResponse)))
                .andDo(print())
                .andDo(toDocument("get-member-success"));
    }

    private void 회원정보_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-member-fail"));
    }

    private ResultActions 회원정보_수정_요청(UpdateRequest updateRequest) throws Exception {
        return mockMvc.perform(multipart("/api/v1/members/update")
                .file(new MockMultipartFile("file", "image.png", "image/png", "{image data}".getBytes()))
                .file(new MockMultipartFile("updateRequest", "", "application/json", toJson(updateRequest).getBytes()))
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.MULTIPART_FORM_DATA));
    }

    private void 회원정보_수정_성공(ResultActions resultActions, UpdateResponse updateResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(updateResponse)))
                .andDo(print())
                .andDo(toDocument("update-member-success"));
    }

    private void 회원정보_수정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-member-fail"));
    }

    private ResultActions 마이페이지_비밀번호_재설정_요청(PasswordUpdateRequest passwordUpdateRequest) throws Exception {
        return mockMvc.perform(patch("/api/v1/members/mypage/password")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(passwordUpdateRequest)));
    }

    private void 마이페이지_비밀번호_재설정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-password-in-mypage-success"));
    }

    private void 마이페이지_비밀번호_재설정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-password-in-mypage-fail"));
    }

    private ResultActions 회원탈퇴_요청() throws Exception {
        return mockMvc.perform(delete("/api/v1/members")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 회원탈퇴_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("delete-member-success"));
    }

    private void 회원탈퇴_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("delete-member-fail"));
    }

    private ResultActions 이메일_중복체크_요청(String email) throws Exception {
        return mockMvc.perform(get("/api/v1/members/email?email=" + email));
    }

    private void 이메일_중복체크_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("check-email-success"));
    }

    private void 이메일_중복체크_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isBadRequest())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("check-email-fail"));
    }

    private ResultActions 닉네임_중복체크_요청(String nickname) throws Exception {
        return mockMvc.perform(get("/api/v1/members/nickname?nickname=" + nickname));
    }

    private void 닉네임_중복체크_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("check-nickname-success"));
    }

    private void 닉네임_중복체크_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isBadRequest())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("check-nickname-fail"));
    }

    private ResultActions 회원가입_요청(SignUpRequest signUpRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(signUpRequest)));
    }

    private void 회원가입_성공(ResultActions resultActions, SignUpResponse signUpResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(signUpResponse)))
                .andDo(print())
                .andDo(toDocument("signup-success"));
    }

    private void 회원가입_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("signup-fail"));
    }

    private ResultActions 사전_설문조사_저장_요청(SurveyRequest surveyRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members/survey")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(surveyRequest)));
    }

    private void 사전_설문조사_저장_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-survey-success"));
    }

    private void 사전_설문조사_저장_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-survey-fail"));
    }

    private ResultActions 아이디_찾기_요청(FindingEmailRequest findingEmailRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members/email")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(findingEmailRequest)));
    }

    private void 아이디_찾기_성공(ResultActions resultActions, EmailResponse emailResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(emailResponse)))
                .andDo(print())
                .andDo(toDocument("get-email-success"));
    }

    private void 아이디_찾기_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-email-fail"));
    }

    private ResultActions 비밀번호_재설정_요청(PasswordUpdateVerificationRequest passwordUpdateVerificationRequest) throws Exception {
        return mockMvc.perform(patch("/api/v1/members/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(passwordUpdateVerificationRequest)));
    }

    private void 비밀번호_재설정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-password-success"));
    }

    private void 비밀번호_재설정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-password-fail"));
    }

    private ResultActions 로그인_요청(LoginRequest loginRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(loginRequest)));
    }

    private void 로그인_성공(ResultActions resultActions, LoginResponse loginResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(loginResponse)))
                .andDo(print())
                .andDo(toDocument("login-success"));
    }

    private void 로그인_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("login-fail"));
    }
}
