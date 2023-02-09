package com.w6w.corns.jwt;

import com.w6w.corns.service.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;
    private final AuthorizationExtractor authorizationExtractor;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String url = request.getRequestURI();
        if(url.contains("swagger") || url.contains("api-docs") || url.contains("webjars"))
            return true;

        // room 목록 반환하는 api만 허용
        if(request.getRequestURI().equals("/room") && request.getMethod().equals("GET")) return true;

        // OPTIONS로 오는 preflight 허용
        if(request.getMethod().equals("OPTIONS")) return true;

        String token = authorizationExtractor.extract(request, "Bearer");

        if(token.isEmpty() || token == null || !jwtService.checkToken(token)) {
            response.setStatus(401);
            log.debug("interceptor!");
            return false;
        }
        return true;
    }
}
