package com.hanssarang.backend.common.exception;

import com.hanssarang.backend.common.domain.ErrorMessage;

public class NotFoundException extends CommonException {

    public NotFoundException(ErrorMessage message) {
        super(message);
    }
}
