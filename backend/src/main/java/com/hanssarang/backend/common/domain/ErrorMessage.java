package com.hanssarang.backend.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {

    FAIL_TO_SIGNUP("가입에 실패했습니다."),
    FAIL_TO_CREATE_SURVEY("사전 설문조사 저장에 실패했습니다."),
    FAIL_TO_UPDATE_MEMBER("회원정보 수정에 실패하였습니다."),
    FAIL_TO_UPDATE_IMAGE("회원 프로필 사진 수정에 실패하였습니다."),
    FAIL_TO_UPDATE_PASSWORD("비밀번호 수정에 실패하였습니다."),
    FAIL_TO_DELETE_MEMBER("회원탈퇴에 실패하였습니다."),
    FAIL_TO_SAVE_FILE("파일 저장에 실패했습니다."),
    FAIL_TO_GET_MOUNTAINS("산 목록 조회에 실패했습니다."),
    FAIL_TO_SEARCH_MOUNTAIN("산 검색에 실패했습니다."),
    FAIL_TO_SEARCH_TRAIL("등산로 검색에 실패했습니다."),
    FAIL_TO_CREATE_HIKING("등산 정보 저장에 실패했습니다."),
    FAIL_TO_CREATE_HIKING_IMAGE("등산 이미지 저장에 실패했습니다."),
    FAIL_TO_SEND_EMAIL("이메일 전송에 실패했습니다."),
    FAIL_TO_LOAD_IMAGE("이미지를 불러오는 데 실패했습니다."),
    NOT_FOUND_MEMBER("사용자를 찾을 수 없습니다."),
    NOT_FOUND_HIKING("등산 정보를 찾을 수 없습니다."),
    NOT_FOUND_MOUNTAIN("해당 산을 찾을 수 없습니다."),
    NOT_FOUND_TRAIL("해당 등산로를 찾을 수 없습니다."),
    NOT_EQUAL_PASSWORD("비밀번호가 일치하지 않습니다."),
    NOT_EQUAL_VALIDATION_TOKEN("이메일 인증번호가 일치하지 않습니다."),
    DUPLICATED_EMAIL("중복된 이메일이 있습니다."),
    DUPLICATED_NICKNAME("중복된 닉네임이 있습니다."),
    WRONG_PATH("잘못된 경로입니다."),
    WRONG_TOKEN("잘못된 토큰 값입니다."),
    WRONG_CONTENT_TYPE("잘못된 확장자입니다."),
    EXPIRED_TOKEN("로그인 정보가 만료되었습니다."),
    NO_TOKEN("토큰이 없습니다.");

    private final String message;
}
