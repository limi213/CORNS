package com.w6w.corns.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Slf4j
@Service
public class JwtServiceImpl implements JwtService{

    @Value("${jwt.secret}")
    private String SECRET_KEY;
    private static final long TOKEN_VALIDATION_SECOND = 1000L * 10;
    private static final long REFRESH_TOKEN_VALIDATION_SECOND = 1000L * 60 * 24 * 2;
    @Override
    public <T> String createAccessToken(String key, T data) {
        return create(key, data, "accessToken", TOKEN_VALIDATION_SECOND);
    }

    @Override
    public <T> String createRefreshToken(String key, T data) {
        return create(key, data, "refreshToken", REFRESH_TOKEN_VALIDATION_SECOND);
    }

    //key 생성
    private byte[] generateKey(){
        return SECRET_KEY.getBytes(StandardCharsets.UTF_8);
    }

    // 토큰 발급
    @Override
    public <T> String create(String key, T data, String subject, long expire) {
        return Jwts.builder()
                .setHeaderParam("type", "JWT")
                .setHeaderParam("regDt", System.currentTimeMillis())
                .setExpiration(new Date(System.currentTimeMillis()+expire))
                .setSubject(subject)
                .claim(key, data)
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact();
    }

    @Override
    public Map<String, Object> get(String key) {
        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes())
                .getRequest();

        String jwt = request.getHeader("accessToken");
        Jws<Claims> claims = null;
        try{
            claims = Jwts.parser().setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8)).parseClaimsJws(jwt);
        }catch(Exception e){
            log.error(e.getMessage());
        }
        Map<String, Object> value = claims.getBody();
        return value;
    }

    @Override
    public int getUserId() {
        return (int)this.get("user").get("id");
    }
    //토큰 제대로 생성됐는지 확인
    @Override
    public boolean checkToken(String jwt) {

        try{
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);
            return true;

        }catch(Exception e){
            log.error(e.getMessage());
            return false;
        }
    }
}
