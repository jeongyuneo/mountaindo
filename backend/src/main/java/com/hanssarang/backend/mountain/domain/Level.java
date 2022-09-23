package com.hanssarang.backend.mountain.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Level {

    LOW("하"),
    MIDDLE("중"),
    HIGH("상");

    private final String value;
}
