package com.hanssarang.backend.common.exception;

import com.hanssarang.backend.common.domain.ErrorMessage;

public class CommonException extends RuntimeException {

    public CommonException(ErrorMessage message) {
        super(message.getMessage());
    }
}
