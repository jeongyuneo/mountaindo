package com.hanssarang.backend.hiking.controller;

import com.hanssarang.backend.ApiDocument;
import com.hanssarang.backend.common.domain.ErrorMessage;
import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.hiking.controller.dto.*;
import com.hanssarang.backend.hiking.service.HikingService;
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

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(HikingController.class)
public class HikingControllerTest extends ApiDocument {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final int ID = 1;
    private static final String NICKNAME = "닉네임";
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, NICKNAME);
    private static final String MOUNTAIN_NAME = "북악산";
    private static final String ADDRESS = "서울시 종로구";
    private static final LocalDate LAST_HIKING_DATE = LocalDate.parse("2022-09-19");
    private static final String LAST_HIKING_TRAIL_NAME = "A코스";
    private static final String TRAIL_NAME = "A코스";
    private static final double LATITUDE = 30.0312;
    private static final double LONGITUDE = 500.1937;
    private static final double ACCUMULATED_HEIGHT = 320.45;
    private static final double DISTANCE = 100.3;
    private static final byte[] IMAGE_URL = "{image url}".getBytes(StandardCharsets.UTF_8);
    private static final LocalTime USE_TIME = LocalTime.parse("16:40:20");
    private static final String LEVEL = "중";

    private HikingRequest hikingRequest;
    private List<HikingListResponse> hikingListResponses;
    private List<CompletedHikingListResponse> completedHikingListResponses;
    private HikingResponse hikingResponse;

    @MockBean
    private HikingService hikingService;

    @BeforeEach
    void setUp() {
        List<PathResponse> pathResponse = IntStream.range(1, 6)
                .mapToObj(n -> PathResponse.builder().latitude(n * LATITUDE).longitude((n / 2.0) * LONGITUDE).build())
                .collect(Collectors.toList());
        hikingRequest = HikingRequest.builder()
                .trailId(ID)
                .path(pathResponse)
                .endPoint(PathResponse.builder().latitude(LATITUDE).longitude(LONGITUDE).build())
                .accumulatedHeight(ACCUMULATED_HEIGHT)
                .useTime(USE_TIME)
                .build();
        hikingListResponses = IntStream.range(0, 3)
                .mapToObj(n -> HikingListResponse.builder()
                        .hikingId(ID)
                        .trailName(TRAIL_NAME)
                        .lastHikingDate(LAST_HIKING_DATE)
                        .useTime(USE_TIME)
                        .level(LEVEL)
                        .mountainName(MOUNTAIN_NAME)
                        .build())
                .collect(Collectors.toList());
        completedHikingListResponses = IntStream.range(0, 3)
                .mapToObj(n -> CompletedHikingListResponse.builder()
                        .mountainName(MOUNTAIN_NAME)
                        .address(ADDRESS)
                        .lastHikingDate(LAST_HIKING_DATE)
                        .lastHikingTrailName(LAST_HIKING_TRAIL_NAME)
                        .latitude(LATITUDE)
                        .longitude(LONGITUDE)
                        .build())
                .collect(Collectors.toList());
        hikingResponse = HikingResponse.builder()
                .mountainName(MOUNTAIN_NAME)
                .address(ADDRESS)
                .trailName(TRAIL_NAME)
                .distance(DISTANCE)
                .useTime(USE_TIME)
                .image(IMAGE_URL)
                .accumulatedHeight(ACCUMULATED_HEIGHT)
                .build();
    }

    @DisplayName("등산 목록 조회 - 성공")
    @Test
    void getHikingsSuccess() throws Exception {
        // given
        willReturn(hikingListResponses).given(hikingService).getHikings(anyInt());
        // when
        ResultActions resultActions = 등산목록_조회_요청();
        // then
        등산목록_조회_성공(resultActions, hikingListResponses);
    }

    @DisplayName("등산 목록 조회 - 사용자 조회 실패")
    @Test
    void getHikingsFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(hikingService).getHikings(anyInt());
        // when
        ResultActions resultActions = 등산목록_조회_요청();
        // then
        등산목록_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    @DisplayName("등산 상세 조회 - 성공")
    @Test
    void getHikingSuccess() throws Exception {
        // given
        willReturn(hikingResponse).given(hikingService).getHiking(anyInt(), anyInt());
        // when
        ResultActions resultActions = 등산상세_조회_요청(ID);
        // then
        등산상세_조회_성공(resultActions, hikingResponse);
    }

    @DisplayName("등산 상세 조회 - 실패")
    @Test
    void getHikingFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_HIKING)).given(hikingService).getHiking(anyInt(), anyInt());
        // when
        ResultActions resultActions = 등산상세_조회_요청(ID);
        // then
        등산상세_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_HIKING));
    }

    @DisplayName("완등 목록 조회 - 성공")
    @Test
    void getCompletedHikingsSuccess() throws Exception {
        // given
        willReturn(completedHikingListResponses).given(hikingService).getCompletedHikings(anyInt());
        // when
        ResultActions resultActions = 완등목록_조회_요청();
        // then
        완등목록_조회_성공(resultActions, completedHikingListResponses);
    }

    @DisplayName("완등 목록 조회 - 사용자 조회 실패")
    @Test
    void getCompletedHikingsFail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(hikingService).getCompletedHikings(anyInt());
        // when
        ResultActions resultActions = 완등목록_조회_요청();
        // then
        완등목록_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    @DisplayName("등산 기록 저장 - 성공")
    @Test
    void createHikingSuccess() throws Exception {
        // given
        willDoNothing().given(hikingService).createHiking(anyInt(), any(HikingRequest.class));
        // when
        ResultActions resultActions = 등산기록_저장_요청(hikingRequest);
        // then
        등산기록_저장_성공(resultActions);
    }

    @DisplayName("등산 기록 저장 - 실패")
    @Test
    void createHikingFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(ErrorMessage.FAIL_TO_CREATE_HIKING.getMessage())).given(hikingService).createHiking(anyInt(), any(HikingRequest.class));
        // when
        ResultActions resultActions = 등산기록_저장_요청(hikingRequest);
        // then
        등산기록_저장_실패(resultActions, new Message(ErrorMessage.FAIL_TO_CREATE_HIKING));
    }

    @DisplayName("등산 기록 이미지 저장 - 성공")
    @Test
    void createHikingImageSuccess() throws Exception {
        // given
        willDoNothing().given(hikingService).createImage(anyInt(), anyInt(), any(MultipartFile.class));
        // when
        ResultActions resultActions = 등산기록_이미지_저장_요청(ID);
        // then
        등산기록_이미지_저장_성공(resultActions);
    }

    @DisplayName("등산 기록 이미지 저장 - 실패")
    @Test
    void createHikingImageFail() throws Exception {
        // given
        willThrow(new UnexpectedRollbackException(ErrorMessage.FAIL_TO_CREATE_HIKING_IMAGE.getMessage())).given(hikingService).createImage(anyInt(), anyInt(), any(MultipartFile.class));
        // when
        ResultActions resultActions = 등산기록_이미지_저장_요청(ID);
        // then
        등산기록_이미지_저장_실패(resultActions, new Message(ErrorMessage.FAIL_TO_CREATE_HIKING_IMAGE));
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

    private void 완등목록_조회_성공(ResultActions resultActions, List<CompletedHikingListResponse> completedHikingListResponses) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(completedHikingListResponses)))
                .andDo(print())
                .andDo(toDocument("get-completed-hikings-success"));
    }

    private void 완등목록_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-completed-hikings-fail"));
    }

    private ResultActions 등산기록_저장_요청(HikingRequest hikingRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/hikings")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(hikingRequest)));
    }

    private void 등산기록_저장_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-hiking-success"));
    }

    private void 등산기록_저장_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-hiking-fail"));
    }

    private ResultActions 등산기록_이미지_저장_요청(int hikingId) throws Exception {
        return mockMvc.perform(multipart("/api/v1/hikings/image/" + hikingId)
                .file(new MockMultipartFile("file", "image.png", "image/png", "{image data}".getBytes()))
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.MULTIPART_FORM_DATA));
    }

    private void 등산기록_이미지_저장_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-hiking-image-success"));
    }

    private void 등산기록_이미지_저장_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-hiking-image-fail"));
    }
}
