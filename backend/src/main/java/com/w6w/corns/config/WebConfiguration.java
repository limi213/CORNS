package com.w6w.corns.config;

import com.w6w.corns.jwt.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    private final JwtInterceptor jwtInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .maxAge(3000);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        //메인페이지에서 api 호출도 풀기
        registry.addInterceptor(jwtInterceptor)
                .excludePathPatterns("/**") // temp
                .excludePathPatterns("/swagger/**")
                .excludePathPatterns("/swagger-ui.html")
                .excludePathPatterns("/swagger-resources/**")
                .excludePathPatterns("/v2/api-docs")
                .excludePathPatterns("/rank/hof")
                .excludePathPatterns("/user/join")
                .excludePathPatterns("/user/email-check/{email}")
                .excludePathPatterns("/user/login/**")
                .excludePathPatterns("/user/auth/{socialType}/callback")
                .excludePathPatterns("/resources/**");
    }
}
