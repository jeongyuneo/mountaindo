package com.hanssarang.backend.config;

import com.hanssarang.backend.interceptor.JwtAuthInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.hanssarang.backend.common.domain.Message.AUTHORIZATION;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String API_SPECIFICATION = "/docs/**";

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders(AUTHORIZATION)
                .maxAge(6000);
    }

    @Override
    public void addInterceptors(final InterceptorRegistry interceptorRegistry) {
        interceptorRegistry.addInterceptor(new JwtAuthInterceptor())
                .excludePathPatterns(API_SPECIFICATION);
    }
}
