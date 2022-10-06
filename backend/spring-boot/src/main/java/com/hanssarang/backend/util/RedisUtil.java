package com.hanssarang.backend.util;

import com.hanssarang.backend.common.exception.NotEqualException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;

import static com.hanssarang.backend.common.domain.ErrorMessage.NOT_EQUAL_VALIDATION_TOKEN;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class RedisUtil {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private static StringRedisTemplate staticRedisTemplate;

    @PostConstruct
    private void initStatic() {
        staticRedisTemplate= this.redisTemplate;
    }

    public static String getData(String key) {
        return staticRedisTemplate.opsForValue()
                .get(key);
    }

    public static void setDataExpired(String key, String value, long duration) {
        Duration expireDuration = Duration.ofSeconds(duration);
        staticRedisTemplate.opsForValue()
                .set(key, value, expireDuration);
    }

    public static void validateData(String key, String value) {
        if (!getData(key).equals(value)) {
            throw new NotEqualException(NOT_EQUAL_VALIDATION_TOKEN);
        }
    }
}
