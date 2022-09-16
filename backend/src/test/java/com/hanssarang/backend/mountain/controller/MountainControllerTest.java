package com.hanssarang.backend.mountain.controller;

import com.hanssarang.backend.ApiDocument;
import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.common.exception.NotFoundException;
import com.hanssarang.backend.mountain.controller.dto.MountainDetailResponse;
import com.hanssarang.backend.mountain.controller.dto.MountainResponse;
import com.hanssarang.backend.mountain.service.MountainService;
import com.hanssarang.backend.trail.controller.dto.TrailResponse;
import com.hanssarang.backend.trail.domain.Trail;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MountainController.class)
class MountainControllerTest extends ApiDocument {

    private static final int MOUNTAINID = 1;
    private static final String NAME = "북한산";
    private static final int HEIGHT = 836;
    private static final String ADDRESS = "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구, 경기도 고양시ㆍ양주시";
    private static final String IMAGEURL = "http://www.forest.go.kr/newkfsweb/cmm/fms/getImage.do?fileSn=1&atchFileId=FILE_000000000424203";

    private MountainResponse mountainResponse;

    @MockBean
    private MountainService mountainService;

    @BeforeEach
    void setUp() {
        mountainResponse = MountainResponse.builder()
                .mountainId(MOUNTAINID)
                .name(NAME)
                .height(HEIGHT)
                .address(ADDRESS)
                .imageUrl(IMAGEURL)
                .build();
    }

    @DisplayName("산 전체 목록 조회 성공")
    @Test
    void getMountainsSuccess() throws Exception {
        // given
        List<MountainResponse> mountains = Arrays.asList(mountainResponse);
        willReturn(mountains).given(mountainService).getMountains();
        // when
        ResultActions resultActions = 산_조회_요청();
        // then
        산_조회_요청_성공(resultActions, mountains);
    }

    private ResultActions 산_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1/mountains")
                .header("Authorization", "Bearer {Access Token}"));
    }

    private void 산_조회_요청_성공(ResultActions resultActions, List<MountainResponse> mountains) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(mountains)))
                .andDo(print())
                .andDo(toDocument("get-mountains-success"));
    }

    @DisplayName("산 검색 성공")
    @Test
    void getMountainByNameSuccess() throws Exception {
        // given
        willReturn(mountainResponse).given(mountainService).getMountainByName(NAME);
        // when
        ResultActions resultActions = 산_검색_요청(NAME);
        // then
        산_검색_요청_성공(resultActions, mountainResponse);
    }

    private ResultActions 산_검색_요청(String name) throws Exception {
        return mockMvc.perform(get("/api/v1/mountains/search?name=" + name)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer {Access Token}")
        );
    }

    private void 산_검색_요청_성공(ResultActions resultActions, MountainResponse mountainResponse) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(mountainResponse)))
                .andDo(print())
                .andDo(toDocument("get-mountain-by-name-success"));
    }
}