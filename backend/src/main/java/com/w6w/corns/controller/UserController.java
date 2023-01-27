package com.w6w.corns.controller;

//import com.w6w.corns.auth.OAuthService;
import com.w6w.corns.service.jwt.JwtService;
import com.w6w.corns.dto.user.LoginResponseDto;
import com.w6w.corns.dto.user.UserRequestDto;
import com.w6w.corns.service.user.UserService;
import com.w6w.corns.util.SHA256Util;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Api("사용자 컨트롤러")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    private ResponseEntity<?> exceptionHandling(Exception e) {
        Map<String, String> map = new HashMap<>();
        map.put("message", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //join
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserRequestDto user){
        try {
            String salt = SHA256Util.generateSalt();
            String newPass = SHA256Util.getEncrypt(user.getPassword(), salt);
            user.setPassword(newPass);
            user.setSalt(salt);

            int result = userService.signUp(user);
            if(result < 0) return new ResponseEntity<>(HttpStatus.CONFLICT); //중복 이메일
            else return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @GetMapping("/email-check/{email}")
    public ResponseEntity<?> checkDuplicateEmail(@PathVariable String email){

        try {
            int result = userService.validateDuplicateUser(email);
            if(result == 0) return new ResponseEntity<>(HttpStatus.OK);
            else return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            log.error((e.getMessage()));
            return exceptionHandling(e);
        }
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequestDto requestUser){

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        LoginResponseDto loginUser = null;
        try {
            loginUser = userService.login(requestUser);
            System.out.println("loginUser = " + loginUser);
            if(loginUser == null) status = HttpStatus.UNAUTHORIZED;
            else{
                String accessToken = jwtService.createAccessToken("id", loginUser.getUserId());
                String refreshToken = jwtService.createRefreshToken("id", loginUser.getUserId());

                log.debug("accessToken = " + accessToken);
                log.debug("refreshToken = " + refreshToken);

                //경험치도 줘야함!
                userService.saveRefreshToken(loginUser.getUserId(), refreshToken);
                userService.updateLastLoginTm(loginUser.getUserId());
                loginUser.setRefreshToken(refreshToken);
                resultMap.put("accessToken", accessToken);
                resultMap.put("refreshToken", refreshToken);
                resultMap.put("loginUser", loginUser);
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error("로그인 실패 "+ e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }



    @GetMapping("/login/google")
    public ResponseEntity<?> googleLogin(@RequestParam String code){

        //Authorization code 받기 -> OAuth 서버에 토큰 요청
        //access token으로 이름, 이메일, 프로필url 요청
        //db에 존재한다면 업데이트, 아니면 새로 등록
        //유저 primary key 값으로 jwt 토큰 생성
        return null;
    }

    //logout
    @PostMapping("/user/logout/{userId}")
    public ResponseEntity<?> logout(@RequestParam int userId){

        try {
            userService.deleteRefreshToken(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }
}
