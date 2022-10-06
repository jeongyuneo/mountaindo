package com.hanssarang.backend.common.exception;

import com.hanssarang.backend.common.domain.ErrorMessage;

public class DuplicationException extends CommonException {

    public DuplicationException(ErrorMessage message) {
        super(message);
    }
}
