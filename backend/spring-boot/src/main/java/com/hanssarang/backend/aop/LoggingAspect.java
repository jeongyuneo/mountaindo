package com.hanssarang.backend.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    private static Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Before(value = "execution(* com.hanssarang..controller.*Controller.*(..))")
    public void logging(JoinPoint joinPoint) {
        logger.debug("메소드 선언부 : {}, 전달 파라미터 : {}", joinPoint.getSignature(), Arrays.toString(joinPoint.getArgs()));
    }
}
