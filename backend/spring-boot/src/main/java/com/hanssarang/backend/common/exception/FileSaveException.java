package com.hanssarang.backend.common.exception;

import com.hanssarang.backend.common.domain.ErrorMessage;

public class FileSaveException extends CommonException {

    public FileSaveException(ErrorMessage message) {
        super(message);
    }
}
