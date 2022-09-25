package com.hanssarang.backend.common.controller;

import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.common.exception.BadRequestException;
import com.hanssarang.backend.common.exception.CommonException;
import com.hanssarang.backend.common.exception.DuplicationException;
import com.hanssarang.backend.common.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({DuplicationException.class, BadRequestException.class})
    public Message DuplicationException(CommonException exception) {
        log.info("DuplicationException: {}", exception.getMessage());
        return new Message(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public Message NotFoundException(NotFoundException exception) {
        log.info("NotFoundException: {}", exception.getMessage());
        return new Message(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Message InternalServerException(Exception exception) {
        log.info("InternalServerException: {}", exception.getMessage(), exception);
        return new Message(exception.getMessage());
    }
}
