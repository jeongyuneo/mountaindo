package com.hanssarang.backend.common.exception;

import com.hanssarang.backend.common.domain.ErrorMessage;

public class NotEqualException extends CommonException {

        public NotEqualException(ErrorMessage message) {
            super(message);
        }
}
