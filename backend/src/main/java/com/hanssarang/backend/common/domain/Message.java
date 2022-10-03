package com.hanssarang.backend.common.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message {

    public static final String AUTHORIZATION = "Authorization";

    public Message(ErrorMessage message) {
        this.message = message.getMessage();
    }

    public Message(String message) {
        this.message = message;
    }

    private String message;
}
