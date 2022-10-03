package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.ApiDocument;
import com.hanssarang.backend.common.domain.ErrorMessage;
import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.RankingListResponse;
import com.hanssarang.backend.hiking.controller.dto.RankingResponse;
import com.hanssarang.backend.hiking.service.RankingService;
import com.hanssarang.backend.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

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

@WebMvcTest(RankingController.class)
public class RankingControllerTest extends ApiDocument {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final int ID = 1;
    private static final String IMAGE_URL = "imageUrl";
    private static final int RANKING = 5;
    private static final String NICKNAME = "김마운";
    private static final int ACCUMULATED_HEIGHT = 1000;
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, NICKNAME);

    private RankingListResponse rankingListResponse;
    private RankingResponse rankingResponse;

    @MockBean
    private RankingService rankingService;

    @BeforeEach
    void setUp() {
        rankingListResponse = RankingListResponse.builder()
                .imageUrl(IMAGE_URL)
                .ranking(RANKING)
                .nickname(NICKNAME)
                .accumulatedHeight(ACCUMULATED_HEIGHT)
                .rankings(IntStream.range(1, 4)
                        .mapToObj(n -> RankingResponse.builder()
                                .imageUrl(IMAGE_URL)
                                .ranking(n)
                                .nickname(NICKNAME)
                                .accumulatedHeight(ACCUMULATED_HEIGHT * 100 / n)
                                .build())
                        .collect(Collectors.toList()))
                .build();
        rankingResponse = RankingResponse.builder()
                .imageUrl(IMAGE_URL)
                .ranking(RANKING)
                .nickname(NICKNAME)
                .accumulatedHeight(ACCUMULATED_HEIGHT)
                .build();
    }

    @DisplayName("전체 랭킹 조회 - 성공")
    @Test
    void getRankingsSuccess() throws Exception {
        // given
        willReturn(rankingListResponse).given(rankingService).getRankings(anyInt());
        // when
        ResultActions resultActions = 전체랭킹_조회_요청(ID);
        // then
        전체랭킹_조회_성공(resultActions, rankingListResponse);
    }

    @DisplayName("전체 랭킹 조회 - 실패")
    @Test
    void getRankingsFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(rankingService).getRankings(anyInt());
        // when
        ResultActions resultActions = 전체랭킹_조회_요청(ID);
        // then
        전체랭킹_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    @DisplayName("전체 랭킹 내 사용자 검색 - 성공")
    @Test
    void searchRankingSuccess() throws Exception {
        // given
        willReturn(rankingResponse).given(rankingService).searchRanking(anyString());
        // when
        ResultActions resultActions = 전체랭킹내_사용자_검색_요청(NICKNAME);
        // then
        전체랭킹내_사용자_검색_성공(resultActions, rankingResponse);
    }

    @DisplayName("전체 랭킹 내 사용자 검색 - 실패")
    @Test
    void searchRankingFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(rankingService).searchRanking(anyString());
        // when
        ResultActions resultActions = 전체랭킹내_사용자_검색_요청(NICKNAME);
        // then
        전체랭킹내_사용자_검색_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    @DisplayName("산 랭킹 조회 - 성공")
    @Test
    void getRankingsOfMountainSuccess() throws Exception {
        // given
        willReturn(rankingListResponse).given(rankingService).getRankingsOfMountain(anyInt(), anyInt());
        // when
        ResultActions resultActions = 산랭킹_조회_요청(ID);
        // then
        산랭킹_조회_성공(resultActions, rankingListResponse);
    }

    @DisplayName("산 랭킹 조회 - 실패")
    @Test
    void getRankingsOfMountainFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(rankingService).getRankingsOfMountain(anyInt(), anyInt());
        // when
        ResultActions resultActions = 산랭킹_조회_요청(ID);
        // then
        산랭킹_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    @DisplayName("산 랭킹 내 사용자 검색 - 성공")
    @Test
    void searchRankingOfRankingSuccess() throws Exception {
        // given
        willReturn(rankingResponse).given(rankingService).searchRankingOfMountain(anyInt(), anyString());
        // when
        ResultActions resultActions = 산랭킹내_사용자_검색_요청(ID, NICKNAME);
        // then
        산랭킹내_사용자_검색_성공(resultActions, rankingResponse);
    }

    @DisplayName("산 랭킹 내 사용자 검색 - 실패")
    @Test
    void searchRankingOfMountainFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(rankingService).searchRankingOfMountain(anyInt(), anyString());
        // when
        ResultActions resultActions = 산랭킹내_사용자_검색_요청(ID, NICKNAME);
        // then
        산랭킹내_사용자_검색_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private ResultActions 전체랭킹_조회_요청(int memberId) throws Exception {
        return mockMvc.perform(get("/api/v1/rankings")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 전체랭킹_조회_성공(ResultActions resultActions, RankingListResponse rankingListResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(rankingListResponse)))
                .andDo(print())
                .andDo(toDocument("get-rankings-success"));
    }

    private void 전체랭킹_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-rankings-fail"));
    }

    private ResultActions 전체랭킹내_사용자_검색_요청(String keyword) throws Exception {
        return mockMvc.perform(get("/api/v1/rankings/1?keyword=" + keyword)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 전체랭킹내_사용자_검색_성공(ResultActions resultActions, RankingResponse rankingResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(rankingResponse)))
                .andDo(print())
                .andDo(toDocument("search-ranking-success"));
    }

    private void 전체랭킹내_사용자_검색_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("search-ranking-fail"));
    }

    private ResultActions 산랭킹_조회_요청(int mountainId) throws Exception {
        return mockMvc.perform(get("/api/v1/rankings/2/" + mountainId)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 산랭킹_조회_성공(ResultActions resultActions, RankingListResponse rankingListResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(rankingListResponse)))
                .andDo(print())
                .andDo(toDocument("get-rankings-of-mountain-success"));
    }

    private void 산랭킹_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-rankings-of-mountain-fail"));
    }

    private ResultActions 산랭킹내_사용자_검색_요청(int mountainId, String keyword) throws Exception {
        return mockMvc.perform(get("/api/v1/rankings/3/" + mountainId + "?keyword=" + keyword)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 산랭킹내_사용자_검색_성공(ResultActions resultActions, RankingResponse rankingResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(rankingResponse)))
                .andDo(print())
                .andDo(toDocument("search-ranking-of-mountain-success"));
    }

    private void 산랭킹내_사용자_검색_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("search-ranking-of-mountain-fail"));
    }
}
