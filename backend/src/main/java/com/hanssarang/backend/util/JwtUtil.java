package com.hanssarang.backend.util;

import com.hanssarang.backend.common.exception.WrongAccessException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class JwtUtil {

    private static final String JWT_HEADER = "Authorization";
    private static final String SECRET = "ssafy second semester second project - mountaindo";
    private static final int TOKEN_EXPIRE_TIME = 86400;
    private static final String WRONG_TOKEN = "잘못된 토큰 값입니다.";
    private static final String EXPIRED_TOKEN = "로그인 정보가 만료되었습니다.";
    private static final String AUTHORIZATION_TYPE = "Bearer";
    private static final String DELIMITER = " ";
    private static final int TOKEN = 1;

    public static String generateToken(int memberId, String nickname) {
        Claims claims = Jwts.claims();
        claims.put("id", memberId);
        claims.put("nickname", nickname);
        return createToken(claims);
    }

    public static int getMemberId(String token) {
        return (int) getAllClaims(getActualToken(token)).get("id");
    }

    public static void validateToken(String token) {
        try {
            getAllClaims(getActualToken(token));
        } catch (ExpiredJwtException e) {
            throw new WrongAccessException(EXPIRED_TOKEN);
        }
    }

    private static String createToken(Claims claims) {
        return Jwts.builder()
                .setSubject(JWT_HEADER)
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRE_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    private static Claims getAllClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new WrongAccessException(EXPIRED_TOKEN);
        }
    }

    private static String getActualToken(String token) {
        checkValidation(token);
        return token.split(DELIMITER)[TOKEN];
    }

    private static void checkValidation(String token) {
        if (!token.startsWith(AUTHORIZATION_TYPE + DELIMITER)) {
            throw new WrongAccessException(WRONG_TOKEN);
        }
    }
}
