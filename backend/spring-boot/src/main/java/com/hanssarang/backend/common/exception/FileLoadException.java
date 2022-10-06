package com.hanssarang.backend.common.exception;

import com.hanssarang.backend.common.domain.ErrorMessage;

public class FileLoadException extends CommonException {

    public FileLoadException(ErrorMessage message) {
        super(message);
    }
}
