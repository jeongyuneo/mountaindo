package com.hanssarang.backend.interceptor;

import com.hanssarang.backend.common.domain.ErrorMessage;
import com.hanssarang.backend.common.exception.WrongAccessException;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.hanssarang.backend.common.domain.Message.AUTHORIZATION;

public class JwtAuthInterceptor implements HandlerInterceptor {

    private static final String MEMBER_REQUEST = "/api/v1/members";
    private static final String EMAIL_DUPLICATION_CHECK = "/email";
    private static final String FIND_EMAIL = "/email";
    private static final String NICKNAME_DUPLICATION_CHECK = "/nickname";
    private static final String SEND_VALIDATION_TOKEN = "/email/1";
    private static final String VALIDATE_TOKEN = "/email/2";
    private static final String TEMPORARY_PASSWORD_REISSUE = "/update/password";
    private static final String LOGIN = "/login";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        String requestMethod = request.getMethod();
        if (MEMBER_REQUEST.equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || (MEMBER_REQUEST + EMAIL_DUPLICATION_CHECK).equals(requestURI) && HttpMethod.GET.matches(requestMethod)
                || (MEMBER_REQUEST + NICKNAME_DUPLICATION_CHECK).equals(requestURI) && HttpMethod.GET.matches(requestMethod)
                || (MEMBER_REQUEST + SEND_VALIDATION_TOKEN).equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || (MEMBER_REQUEST + VALIDATE_TOKEN).equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || (MEMBER_REQUEST + FIND_EMAIL).equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || (MEMBER_REQUEST + TEMPORARY_PASSWORD_REISSUE).equals(requestURI) && HttpMethod.PATCH.matches(requestMethod)
                || (MEMBER_REQUEST + LOGIN).equals(requestURI) && HttpMethod.POST.matches(requestMethod)) {
            return true;
        }

        String token = request.getHeader(AUTHORIZATION);
        if (token == null) {
            throw new WrongAccessException(ErrorMessage.NO_TOKEN);
        }
        return true;
    }
}
