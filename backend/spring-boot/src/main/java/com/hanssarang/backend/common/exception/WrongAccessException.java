package com.hanssarang.backend.common.exception;

import com.hanssarang.backend.common.domain.ErrorMessage;

public class WrongAccessException extends CommonException {

    public WrongAccessException(ErrorMessage message) {
        super(message);
    }
}
