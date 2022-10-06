package com.hanssarang.backend.common.exception;

import com.hanssarang.backend.common.domain.ErrorMessage;

public class BadRequestException extends CommonException {

    public BadRequestException(ErrorMessage message) {
        super(message);
    }
}
