package com.hanssarang.backend.member.controller;

import com.hanssarang.backend.ApiDocument;
import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.common.exception.DuplicationException;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.member.controller.dto.*;
import com.hanssarang.backend.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.UnexpectedRollbackException;

import static com.hanssarang.backend.common.domain.ErrorMessage.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MemberController.class)
public class MemberControllerTest extends ApiDocument {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String ACCESS_TOKEN = "{ACCESS TOKEN generated by JWT}";
    private static final String EMAIL = "ssafy@samsung.com";
    private static final String PASSWORD = "1q2w3e4r";
    private static final String NAME = "이재용";
    private static final String BIRTH = "1968.06.23";
    private static final String PHONENUMBER = "010-3333-3333";
    private static final String ADDRESS = "경기도 수원시 영통구 삼성로 129";
    private static final String NICKNAME = "나는 부회장";
    private static final String IMAGE_URL = "{image url}";
    private static final String MY_LEVEL = "등린이";
    private static final String VISITED_MOUNAIN = "없음";
    private static final String PREFERRED_MOUNTAIN_LOCATION = "내 주변";
    private static final String PREFERRED_MOUNTAIN_STYLE = "무리없는 등산";
    private static final String PREFERRED_CLIMBING_TIME = "1 ~ 2시간";
    private static final int ID = 1;
    private static final String DELETE_MESSAGE = "탈퇴하겠습니다.";
    private static final String NICKNAME_HEADER_NAME = "nickname";
    private static final String MEMBER_EMAIL_HEADER_NAME = "memberEmail";

    private MemberResponse memberResponse;
    private MemberRequest memberRequest;
    private PasswordRequest passwordRequest;
    private NicknameResponse nicknameResponse;
    private EmailResponse emailResponse;
    private SignUpRequest signUpRequest;
    private SurveyRequest surveyRequest;
    private FindingIdRequest findingIdRequest;
    private UpdatePasswordRequest memberUpdatePasswordRequest;
    private LoginRequest loginRequest;

    @MockBean
    private MemberService memberService;

    @BeforeEach
    void setUp() {
        memberResponse = MemberResponse.builder()
                .email(EMAIL)
                .name(NAME)
                .birth(BIRTH)
                .phone(PHONENUMBER)
                .address(ADDRESS)
                .nickName(NICKNAME)
                .profilePicture(IMAGE_URL)
                .build();
        memberRequest = MemberRequest.builder()
                .name(NAME)
                .phone(PHONENUMBER)
                .address(ADDRESS)
                .nickName(NICKNAME)
                .profilePicture(IMAGE_URL)
                .build();
        passwordRequest = PasswordRequest.builder()
                .password(PASSWORD)
                .build();
        nicknameResponse = NicknameResponse.builder()
                .nickname(NICKNAME)
                .build();
        emailResponse = EmailResponse.builder()
                .email(EMAIL)
                .build();
        nicknameResponse = NicknameResponse.builder()
                .nickname(NICKNAME)
                .build();
        signUpRequest = SignUpRequest.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .name(NAME)
                .birth(BIRTH)
                .phone(PHONENUMBER)
                .address(ADDRESS)
                .nickName(NICKNAME)
                .build();
        surveyRequest = SurveyRequest.builder()
                .myLevel(MY_LEVEL)
                .visitedMountain(VISITED_MOUNAIN)
                .mountainLocation(PREFERRED_MOUNTAIN_LOCATION)
                .mountainStyle(PREFERRED_MOUNTAIN_STYLE)
                .climbingTime(PREFERRED_CLIMBING_TIME)
                .build();
        findingIdRequest = FindingIdRequest.builder()
                .name(NAME)
                .birth(BIRTH)
                .phone(PHONENUMBER)
                .build();
        memberUpdatePasswordRequest = UpdatePasswordRequest.builder()
                .email(EMAIL)
                .name(NAME)
                .build();
        loginRequest = LoginRequest.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .build();
    }

    @DisplayName("회원 정보 조회 - 성공")
    @Test
    void getMemberSuccess() throws Exception {
        // given
        willReturn(memberResponse).given(memberService).getMember();
        // when
        ResultActions resultActions = 회원정보_조회_요청(ID);
        // then
        회원정보_조회_성공(resultActions, memberResponse);
    }

    @DisplayName("회원 정보 조회 - 실패")
    @Test
    void getMemberFail() throws Exception {
        // given
        willThrow(new NotFoundException(NOT_FOUND_MEMBER)).given(memberService).getMember();
        // when
        ResultActions resultActions = 회원정보_조회_요청(ID);
        // then
        회원정보_조회_실패(resultActions, new Message(NOT_FOUND_MEMBER));
    }

    @DisplayName("회원정보 수정 - 성공")
    @Test
    void updateMemberSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).updateMember(anyInt(), any(MemberRequest.class));
        // when
        ResultActions resultActions = 회원정보_수정_요청(ID, memberRequest);
        // then
        회원정보_수정_성공(resultActions);
    }

    @DisplayName("회원정보 수정 - 실패")
    @Test
    void updateMemberFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_UPDATE_MEMBER)).given(memberService).updateMember(anyInt(), any(MemberRequest.class));
        // when
        ResultActions resultActions = 회원정보_수정_요청(ID, memberRequest);
        // then
        회원정보_수정_실패(resultActions, new Message(FAIL_TO_UPDATE_MEMBER));
    }

    @DisplayName("마이페이지에서 비밀번호 재설정 - 성공")
    @Test
    void updateMyPasswordSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).updatePasswordInMyPage(anyInt(), any(PasswordRequest.class));
        // when
        ResultActions resultActions = 마이페이지_비밀번호_재설정_요청(ID, passwordRequest);
        // then
        마이페이지_비밀번호_재설정_성공(resultActions);
    }

    @DisplayName("마이페이지에서 비밀번호 재설정 - 실패")
    @Test
    void updateMyPasswordFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_UPDATE_PASSWORD)).given(memberService).updatePasswordInMyPage(anyInt(), any(PasswordRequest.class));
        // when
        ResultActions resultActions = 마이페이지_비밀번호_재설정_요청(ID, passwordRequest);
        // then
        마이페이지_비밀번호_재설정_실패(resultActions, new Message(FAIL_TO_UPDATE_PASSWORD));
    }

    @DisplayName("회원탈퇴 - 성공")
    @Test
    void deleteMemberSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).deleteMember();
        // when
        ResultActions resultActions = 회원탈퇴_요청();
        // then
        회원탈퇴_성공(resultActions);
    }

    @DisplayName("회원탈퇴 - 실패")
    @Test
    void deleteMemberFail() throws Exception {
        // give
        willThrow(new UnexpectedRollbackException(FAIL_TO_DELETE_MEMBER)).given(memberService).deleteMember();
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
        willThrow(new DuplicationException(FAIL_TO_CHECK_NICKNAME)).given(memberService).checkNickname(anyString());
        // when
        ResultActions resultActions = 닉네임_중복체크_요청(NICKNAME);
        // then
        닉네임_중복체크_실패(resultActions, new Message(FAIL_TO_CHECK_NICKNAME));
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
        willThrow(new DuplicationException(FAIL_TO_CHECK_EMAIL)).given(memberService).checkEmail(anyString());
        // when
        ResultActions resultActions = 이메일_중복체크_요청(EMAIL);
        // then
        이메일_중복체크_실패(resultActions, new Message(FAIL_TO_CHECK_EMAIL));
    }

    @DisplayName("일반 회원가입 - 성공")
    @Test
    void signUpSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).signUp(any(SignUpRequest.class));
        // when
        ResultActions resultActions = 일반_회원가입_요청(signUpRequest);
        // then
        일반_회원가입_성공(resultActions);
    }

    @DisplayName("일반 회원가입 - 실패")
    @Test
    void signUpFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_SIGNUP)).given(memberService).signUp(any(SignUpRequest.class));
        // when
        ResultActions resultActions = 일반_회원가입_요청(signUpRequest);
        // then
        일반_회원가입_실패(resultActions, new Message(FAIL_TO_SIGNUP));
    }

    @DisplayName("사전 설문조사 - 성공")
    @Test
    void surveySuccess() throws Exception {
        // given
        willDoNothing().given(memberService).createInitialSurvey(any(SurveyRequest.class));
        // when
        ResultActions resultActions = 사전_설문조사_요청(surveyRequest);
        // then
        사전_설문_저장_성공(resultActions);
    }

    @DisplayName("사전 설문조사 - 실패")
    @Test
    void surveyFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_SURVEY)).given(memberService).createInitialSurvey(any(SurveyRequest.class));
        // when
        ResultActions resultActions = 사전_설문조사_요청(surveyRequest);
        // then
        사전_설문_저장_실패(resultActions, new Message(FAIL_TO_SURVEY));
    }

    @DisplayName("아이디 찾기 - 성공")
    @Test
    void getMemberIdSuccess() throws Exception {
        // given
        willReturn(emailResponse).given(memberService).getMemberEmail(any(FindingIdRequest.class));
        // when
        ResultActions resultActions = 아이디_찾기_요청(findingIdRequest);
        // then
        아이디_찾기_성공(resultActions, emailResponse);
    }

    @DisplayName("아이디 찾기 - 실패")
    @Test
    void getMemberIdFail() throws Exception {
        // given
        willThrow(new NotFoundException(FAIL_TO_FIND_EMAIL)).given(memberService).getMemberEmail(any(FindingIdRequest.class));
        // when
        ResultActions resultActions = 아이디_찾기_요청(findingIdRequest);
        // then
        아이디_찾기_실패(resultActions, new Message(FAIL_TO_FIND_EMAIL));
    }

    @DisplayName("비밀번호 재설정 - 성공")
    @Test
    void updatePasswordSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).updatePassword(anyInt(), any(UpdatePasswordRequest.class));
        // when
        ResultActions resultActions = 비밀번호_재설정_요청(ID, memberUpdatePasswordRequest);
        // then
        비밀번호_재설정_성공(resultActions);
    }

    @DisplayName("비밀번호 재설정 - 실패")
    @Test
    void updatePasswordFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(FAIL_TO_UPDATE_PASSWORD)).given(memberService).updatePassword(anyInt(), any(UpdatePasswordRequest.class));
        // when
        ResultActions resultActions = 비밀번호_재설정_요청(ID, memberUpdatePasswordRequest);
        // then
        비밀번호_재설정_실패(resultActions, new Message(FAIL_TO_UPDATE_PASSWORD));
    }

    @DisplayName("로그인 - 성공")
    @Test
    void loginSuccess() throws Exception {
        // given
        willDoNothing().given(memberService).login(any(LoginRequest.class));
        // when
        ResultActions resultActions = 로그인_요청(loginRequest);
        // then
        로그인_성공(resultActions);
    }

    @DisplayName("로그인 - 실패")
    @Test
    void loginFail() throws Exception {
        // given
        willThrow(new NotFoundException(FAIL_TO_LOGIN)).given(memberService).login(any(LoginRequest.class));
        // when
        ResultActions resultActions = 로그인_요청(loginRequest);
        // then
        로그인_실패(resultActions, new Message(FAIL_TO_LOGIN));
    }

    private ResultActions 회원정보_조회_요청(int memberId) throws Exception {
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

    private ResultActions 회원정보_수정_요청(int memberId, MemberRequest memberRequest) throws Exception {
        return mockMvc.perform(patch("/api/v1/members/" + memberId)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(memberRequest)));
    }
    private void 회원정보_수정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-member-success"));
    }

    private void 회원정보_수정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-member-fail"));
    }

    private ResultActions 마이페이지_비밀번호_재설정_요청(int memberId, PasswordRequest passwordRequest) throws Exception {
        return mockMvc.perform(patch("/api/v1/members/mypage/password/" + memberId)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(passwordRequest)));
    }

    private void 마이페이지_비밀번호_재설정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-password-in-mypag-success"));
    }

    private void 마이페이지_비밀번호_재설정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-password-in-mypag-fail"));
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

    private ResultActions 이메일_중복체크_요청(String memberEmail) throws Exception {
        return mockMvc.perform(get("/api/v1/members/email")
                .param(MEMBER_EMAIL_HEADER_NAME, memberEmail));
    }

    private void 이메일_중복체크_성공( ResultActions resultActions) throws Exception {
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
        return mockMvc.perform(get("/api/v1/members/nickname")
                .param(NICKNAME_HEADER_NAME, nickname));
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

    private ResultActions 일반_회원가입_요청(SignUpRequest signUpRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(signUpRequest)));
    }

    private void 일반_회원가입_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-signup-success"));
    }

    private void 일반_회원가입_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-signup-fail"));
    }

    private ResultActions 사전_설문조사_요청(SurveyRequest surveyRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members/survey")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(surveyRequest)));
    }

    private void 사전_설문_저장_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("pre-survey-success"));
    }

    private void 사전_설문_저장_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("pre-survey-fail"));
    }

    private ResultActions 아이디_찾기_요청(FindingIdRequest findingIdRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members/get/email")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(findingIdRequest)));
    }

    private void 아이디_찾기_성공(ResultActions resultActions, EmailResponse emailResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(emailResponse)))
                .andDo(print())
                .andDo(toDocument("get-member-id-success"));
    }

    private void 아이디_찾기_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-member-id-fail"));
    }

    private ResultActions 비밀번호_재설정_요청(int memberId, UpdatePasswordRequest memberUpdatePasswordRequest) throws Exception {
        return mockMvc.perform(patch("/api/v1/members/password/" + memberId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(memberUpdatePasswordRequest)));
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

    private void 로그인_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(header().string(AUTHORIZATION, BEARER + ACCESS_TOKEN))
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
