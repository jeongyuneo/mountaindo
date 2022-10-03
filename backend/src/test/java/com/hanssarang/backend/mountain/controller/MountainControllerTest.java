package com.hanssarang.backend.mountain.controller;

import com.hanssarang.backend.ApiDocument;
import com.hanssarang.backend.common.domain.ErrorMessage;
import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.mountain.controller.dto.MountainListResponse;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.controller.dto.TrailListResponse;
import com.hanssarang.backend.mountain.controller.dto.TrailResponse;
import com.hanssarang.backend.mountain.service.MountainService;
import com.hanssarang.backend.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.UnexpectedRollbackException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MountainController.class)
class MountainControllerTest extends ApiDocument {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final int ID = 1;
    private static final String NICKNAME = "닉네임";
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, NICKNAME);
    private static final String NAME = "북한산";
    private static final int HEIGHT = 836;
    private static final String ADDRESS = "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구, 경기도 고양시ㆍ양주시";
    private static final String IMAGE_URL = "{image url}";
    private static final boolean IS_HOT = true;
    private static final String TRAIL_NAME = "A코스";
    private static final double LENGTH = 1;
    private static final String LEVEL = "하";
    private static final int GOING_UP_TIME = 3;
    private static final int GOING_DOWN_TIME = 4;
    private static final String RISK = "경사가 가파릅니다.";
    private static final String NAME_ORDER = "name";
    private static final int PAGE = 1;
    private static final String MOUNTAIN_KEYWORD = "가련";
    private static final String TRAIL_KEYWORD = "구간";
    private static final String SORT = "high-height";
    private static final String SI = "전라북도";

    private List<MountainListResponse> mountainListResponses;
    private MountainResponse mountainResponse;
    private TrailResponse trailResponse;

    @MockBean
    private MountainService mountainService;

    @BeforeEach
    void setUp() {
        mountainListResponses = IntStream.range(0, 3)
                .mapToObj(n -> MountainListResponse.builder()
                        .mountainId(ID)
                        .name(NAME)
                        .height(HEIGHT)
                        .address(ADDRESS)
                        .imageUrl(IMAGE_URL)
                        .isHot(IS_HOT)
                        .build())
                .collect(Collectors.toList());
        mountainResponse = MountainResponse.builder()
                .name(NAME)
                .height(HEIGHT)
                .address(ADDRESS)
                .imageUrl(IMAGE_URL)
                .trails(IntStream.range(0, 3)
                        .mapToObj(n -> TrailListResponse.builder()
                                .name(TRAIL_NAME)
                                .length(LENGTH)
                                .level(LEVEL)
                                .build())
                        .collect(Collectors.toList()))
                .build();
        trailResponse = TrailResponse.builder()
                .name(TRAIL_NAME)
                .goingUpTime(GOING_UP_TIME)
                .goingDownTime(GOING_DOWN_TIME)
                .length(LENGTH)
                .risk(RISK)
                .build();
    }

    @DisplayName("산 목록 조회 - 성공")
    @Test
    void getMountainsSuccess() throws Exception {
        // given
        willReturn(mountainListResponses).given(mountainService).getMountains(anyString(), anyInt());
        // when
        ResultActions resultActions = 산_목록_조회_요청(NAME_ORDER, PAGE);
        // then
        산_목록_조회_성공(resultActions, mountainListResponses);
    }

    @DisplayName("산 목록 조회 - 실패")
    @Test
    void getMountainsFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(ErrorMessage.FAIL_TO_GET_MOUNTAINS.getMessage())).given(mountainService).getMountains(anyString(), anyInt());
        // when
        ResultActions resultActions = 산_목록_조회_요청(NAME_ORDER, PAGE);
        // then
        산_목록_조회_실패(resultActions, new Message(ErrorMessage.FAIL_TO_GET_MOUNTAINS));
    }

    @DisplayName("산 상세 조회 - 성공")
    @Test
    void getMountainSuccess() throws Exception {
        // given
        willReturn(mountainResponse).given(mountainService).getMountain(anyInt());
        // when
        ResultActions resultActions = 산_상세_조회_요청(ID);
        // then
        산_상세_조회_성공(resultActions, mountainResponse);
    }

    @DisplayName("산 상세 조회 - 실패")
    @Test
    void getMountainFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MOUNTAIN)).given(mountainService).getMountain(anyInt());
        // when
        ResultActions resultActions = 산_상세_조회_요청(ID);
        // then
        산_상세_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MOUNTAIN));
    }

    @DisplayName("등산로 상세 조회 - 성공")
    @Test
    void getTrailSuccess() throws Exception {
        // given
        willReturn(trailResponse).given(mountainService).getTrail(anyInt());
        // when
        ResultActions resultActions = 등산로_상세_조회_요청(ID);
        // then
        등산로_상세_조회_성공(resultActions, trailResponse);
    }

    @DisplayName("등산로 상세 조회 - 실패")
    @Test
    void getTrailFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_TRAIL)).given(mountainService).getTrail(anyInt());
        // when
        ResultActions resultActions = 등산로_상세_조회_요청(ID);
        // then
        등산로_상세_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_TRAIL));
    }

    @DisplayName("산 검색 - 성공")
    @Test
    void searchMountainSuccess() throws Exception {
        // given
        willReturn(mountainListResponses).given(mountainService).searchMountain(anyString(), anyString(), anyString());
        // when
        ResultActions resultActions = 산_검색_요청(MOUNTAIN_KEYWORD, SORT, SI);
        // then
        산_검색_성공(resultActions, mountainListResponses);
    }

    @DisplayName("산 검색 - 실패")
    @Test
    void searchMountainFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(ErrorMessage.FAIL_TO_SEARCH_MOUNTAIN.getMessage())).given(mountainService).searchMountain(anyString(), anyString(), anyString());
        // when
        ResultActions resultActions = 산_검색_요청(MOUNTAIN_KEYWORD, SORT, SI);
        // then
        산_검색_실패(resultActions, new Message(ErrorMessage.FAIL_TO_SEARCH_MOUNTAIN));
    }

    @DisplayName("등산로 검색 - 성공")
    @Test
    void searchTrailSuccess() throws Exception {
        // given
        willReturn(mountainListResponses).given(mountainService).searchTrail(anyString());
        // when
        ResultActions resultActions = 등산로_검색_요청(NAME);
        // then
        등산로_검색_성공(resultActions, mountainListResponses);
    }

    @DisplayName("등산로 검색 - 실패")
    @Test
    void searchTrailFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(ErrorMessage.FAIL_TO_SEARCH_TRAIL.getMessage())).given(mountainService).searchTrail(anyString());
        // when
        ResultActions resultActions = 등산로_검색_요청(TRAIL_NAME);
        // then
        등산로_검색_실패(resultActions, new Message(ErrorMessage.FAIL_TO_SEARCH_TRAIL));
    }

    private ResultActions 산_목록_조회_요청(String sort, int page) throws Exception {
        return mockMvc.perform(get("/api/v1/mountains?sort=" + sort + "&page=" + page)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 산_목록_조회_성공(ResultActions resultActions, List<MountainListResponse> mountains) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(mountains)))
                .andDo(print())
                .andDo(toDocument("get-mountains-success"));
    }

    private void 산_목록_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-mountains-fail"));
    }

    private ResultActions 산_상세_조회_요청(int mountainId) throws Exception {
        return mockMvc.perform(get("/api/v1/mountains/" + mountainId)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 산_상세_조회_성공(ResultActions resultActions, MountainResponse mountainResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(mountainResponse)))
                .andDo(print())
                .andDo(toDocument("get-mountain-success"));
    }

    private void 산_상세_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-mountain-fail"));
    }

    private ResultActions 등산로_상세_조회_요청(int trailId) throws Exception {
        return mockMvc.perform(get("/api/v1/mountains/trail/" + trailId)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 등산로_상세_조회_성공(ResultActions resultActions, TrailResponse trailResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(trailResponse)))
                .andDo(print())
                .andDo(toDocument("get-trail-success"));
    }

    private void 등산로_상세_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-trail-fail"));
    }

    private ResultActions 산_검색_요청(String keyword, String sort, String si) throws Exception {
        return mockMvc.perform(get("/api/v1/mountains/search/1?keyword=" + keyword + "&sort=" + sort + "&si=" + si)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 산_검색_성공(ResultActions resultActions, List<MountainListResponse> mountainResponses) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(mountainResponses)))
                .andDo(print())
                .andDo(toDocument("search-mountain-success"));
    }

    private void 산_검색_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("search-mountain-fail"));
    }

    private ResultActions 등산로_검색_요청(String keyword) throws Exception {
        return mockMvc.perform(get("/api/v1/mountains/search/3?keyword=" + keyword)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 등산로_검색_성공(ResultActions resultActions, List<MountainListResponse> mountainListResponses) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(mountainListResponses)))
                .andDo(print())
                .andDo(toDocument("search-trail-success"));
    }

    private void 등산로_검색_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("search-trail-fail"));
    }
}
