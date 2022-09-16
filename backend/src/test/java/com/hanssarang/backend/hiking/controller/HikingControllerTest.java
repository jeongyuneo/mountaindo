package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.ApiDocument;
import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.HikingListResponse;
import com.hanssarang.backend.hiking.controller.dto.HikingPath;
import com.hanssarang.backend.hiking.controller.dto.HikingResponse;
import com.hanssarang.backend.hiking.service.HikingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_HIKING;
import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_FOUND_MEMBER;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(HikingController.class)
public class HikingControllerTest extends ApiDocument {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String ACCESS_TOKEN = "{ACCESS TOKEN generated by JWT}";
    private static final int ID = 1;
    private static final String MOUNTAIN_NAME = "북악산";
    private static final String ADDRESS = "서울시 종로구";
    private static final String LEVEL = "중";
    private static final int HEIGHT = 1930;
    private static final String TRAIL_NAME = "A코스";

    private List<HikingListResponse> hikingListResponse;
    private HikingResponse hikingResponse;

    @MockBean
    private HikingService hikingService;

    @BeforeEach
    void setUp() {
        hikingListResponse = IntStream.range(0, 3)
                .mapToObj(n -> HikingListResponse.builder()
                        .name(MOUNTAIN_NAME)
                        .address(ADDRESS)
                        .level(LEVEL)
                        .build())
                .collect(Collectors.toList());
        hikingResponse = HikingResponse.builder()
                .mountainName(MOUNTAIN_NAME)
                .address(ADDRESS)
                .height(HEIGHT)
                .trailName(TRAIL_NAME)
                .path(IntStream.range(1, 6)
                        .mapToObj(n -> HikingPath.builder().x(n * 30.0312).y((n / 2.0) * 500.1937).build())
                        .collect(Collectors.toList()))
                .build();
    }

    @DisplayName("등산 목록 조회 - 성공")
    @Test
    void getHikingsSuccess() throws Exception {
        // given
        willReturn(hikingListResponse).given(hikingService).getHikings(anyInt());
        // when
        ResultActions resultActions = 등산목록_조회_요청();
        // then
        등산목록_조회_성공(resultActions, hikingListResponse);
    }

    @DisplayName("등산 목록 조회 - 사용자 조회 실패")
    @Test
    void getHikingsFail() throws Exception {
        // given
        willThrow(new NotFoundException(NOT_FOUND_MEMBER)).given(hikingService).getHikings(anyInt());
        // when
        ResultActions resultActions = 등산목록_조회_요청();
        // then
        등산목록_조회_실패(resultActions, new Message(NOT_FOUND_MEMBER));
    }

    @DisplayName("등산 상세 조회 - 성공")
    @Test
    void getHikingSuccess() throws Exception {
        // given
        willReturn(hikingResponse).given(hikingService).getHiking(anyInt());
        // when
        ResultActions resultActions = 등산상세_조회_요청(ID);
        // then
        등산상세_조회_성공(resultActions, hikingResponse);
    }

    @DisplayName("등산 상세 조회 - 실패")
    @Test
    void getHikingFail() throws Exception {
        // given
        willThrow(new NotFoundException(NOT_FOUND_HIKING)).given(hikingService).getHiking(anyInt());
        // when
        ResultActions resultActions = 등산상세_조회_요청(ID);
        // then
        등산상세_조회_실패(resultActions, new Message(NOT_FOUND_HIKING));
    }

    @DisplayName("완등 목록 조회 - 성공")
    @Test
    void getCompletedHikingsSuccess() throws Exception {
        // given
        willReturn(hikingListResponse).given(hikingService).getCompletedHikings(anyInt());
        // when
        ResultActions resultActions = 완등목록_조회_요청();
        // then
        완등목록_조회_성공(resultActions, hikingListResponse);
    }

    @DisplayName("완등 목록 조회 - 사용자 조회 실패")
    @Test
    void getCompletedHikingsFail() throws Exception {
        // given
        willThrow(new NotFoundException(NOT_FOUND_MEMBER)).given(hikingService).getCompletedHikings(anyInt());
        // when
        ResultActions resultActions = 완등목록_조회_요청();
        // then
        완등목록_조회_실패(resultActions, new Message(NOT_FOUND_MEMBER));
    }

    private ResultActions 등산목록_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1/hikings")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 등산목록_조회_성공(ResultActions resultActions, List<HikingListResponse> hikingListResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(hikingListResponse)))
                .andDo(print())
                .andDo(toDocument("get-hikings-success"));
    }

    private void 등산목록_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-hikings-fail"));
    }

    private ResultActions 등산상세_조회_요청(int hikingId) throws Exception {
        return mockMvc.perform(get("/api/v1/hikings/1/" + hikingId)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 등산상세_조회_성공(ResultActions resultActions, HikingResponse hikingResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(hikingResponse)))
                .andDo(print())
                .andDo(toDocument("get-hiking-success"));
    }

    private void 등산상세_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-hiking-fail"));
    }

    private ResultActions 완등목록_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1/hikings/2")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 완등목록_조회_성공(ResultActions resultActions, List<HikingListResponse> hikingListResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(hikingListResponse)))
                .andDo(print())
                .andDo(toDocument("get-completed-hikings-success"));
    }

    private void 완등목록_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-completed-hikings-fail"));
    }
}
