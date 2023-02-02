package com.w6w.corns.controller;

//import com.w6w.corns.auth.OAuthService;
import com.w6w.corns.dto.oauth.GetSocialOauthRes;
import com.w6w.corns.dto.oauth.GoogleUserDto;
import com.w6w.corns.dto.user.*;
import com.w6w.corns.service.jwt.JwtService;
import com.w6w.corns.service.oauth.OAuthService;
import com.w6w.corns.service.user.UserService;
import com.w6w.corns.util.Constant.SocialType;
import com.w6w.corns.util.SHA256Util;
import com.w6w.corns.util.code.UserCode;
import io.swagger.annotations.Api;
import java.io.IOException;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Api("사용자 컨트롤러(홍빈테스트중)")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final OAuthService oAuthService;

    /**
     * 예외 처리
     * @param e
     * @return
     */
    private ResponseEntity<?> exceptionHandling(Exception e) {
        Map<String, String> map = new HashMap<>();
        map.put("message", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 기본 회원가입
     * @param user
     * @return
     */
    @ApiOperation(value = "이메일 회원가입", notes = "기본 회원가입으로 이메일과 비밀번호, 닉네임을 받아 회원가입 진행")
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserJoinRequestDto user){
        try {
            int result = userService.signUp(user);

            if(result < 0) return new ResponseEntity<>(HttpStatus.CONFLICT); //중복 이메일
            else return new ResponseEntity<HttpStatus>(HttpStatus.OK); //회원가입 성공 

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }
    @ApiOperation(value = "이메일 중복 확인", notes = "기본 회원가입 진행 중 입력 이메일 중복 확인")
    @GetMapping("/email-check/{email}")
    public ResponseEntity<?> checkDuplicateEmail(@PathVariable String email){

        try {
            int result = userService.validateDuplicateUser(email);

            if(result == 0) return new ResponseEntity<>(HttpStatus.OK); //중복x
            else return new ResponseEntity<>(HttpStatus.CONFLICT); //중복
        } catch (Exception e) {
            log.error((e.getMessage()));
            return exceptionHandling(e);
        }
    }

    /**
     * 기본 로그인
     * @param requestUser
     * @return
     */
    @ApiOperation(value = "기본 로그인", notes = "이메일, 비밀번호를 통한 로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto requestUser){

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        LoginResponseDto loginUser = null;
        try {
            loginUser = userService.login(requestUser);

            //로그인 실패
            if(loginUser == null) status = HttpStatus.UNAUTHORIZED;
            else{
                //토큰 부여
                String accessToken = jwtService.createAccessToken("id", loginUser.getUserId());
                String refreshToken = jwtService.createRefreshToken("id", loginUser.getUserId());


                userService.saveRefreshToken(loginUser.getUserId(), refreshToken);
                loginUser.setRefreshToken(refreshToken);

                //lastLoginTm 갱신
                userService.updateLastLoginTm(loginUser.getUserId());

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


    /**
     * 소셜 로그인으로 리다이렉트
     * @param socialPath 소셜로그인 타입 google, naver, kakao
     * @return
     */
    @ApiOperation(value = "소셜로그인 요청", notes = "socialType에 맞는 인증서버 호출")
    @GetMapping("/login/auth/{socialType}")
    public void socialLoginRedirect(@PathVariable(name = "socialType") String socialPath){

        SocialType socialType = SocialType.valueOf(socialPath.toUpperCase()); //GOOGLE

        try {
            oAuthService.request(socialType);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     *  소셜 로그인 서버 요청에 의한 callback 처리
     * @param socialPath
     * @param code - code API Server 에서 넘어오는 code
     * @return
     */
    @ApiOperation(value = "소셜로그인 callback 처리", notes = "인증서버에서 주는 code 값으로 로그인 처리")
    @GetMapping("/auth/{socialType}/callback")
    public ResponseEntity<?> callback(@PathVariable(name = "socialType") String socialPath,
            @RequestParam(name = "code") String code){

        SocialType socialType = SocialType.valueOf(socialPath.toUpperCase()); //GOOGLE

        try {
            Map<String, Object> resultMap = new HashMap<>();

            LoginResponseDto loginResponseDto = oAuthService.oAuthLogin(socialType, code);


            //토큰 부여
            String accessToken = jwtService.createAccessToken("id", loginResponseDto.getUserId());
            String refreshToken = jwtService.createRefreshToken("id", loginResponseDto.getUserId());

            userService.saveRefreshToken(loginResponseDto.getUserId(), refreshToken);
            userService.updateLastLoginTm(loginResponseDto.getUserId());
            loginResponseDto.setRefreshToken(refreshToken);

            //경험치도 줘야함!, 리팩토링 필요 + 이메일 중복 통합 처리 

            //lastLoginTm 갱신
            userService.updateLastLoginTm(loginResponseDto.getUserId());

            // 로그인로그 insert
            userService.makeLoginLog(loginResponseDto.getUserId());

            resultMap.put("accessToken", accessToken);
            resultMap.put("refreshToken", refreshToken);
            resultMap.put("loginUser", loginResponseDto);

            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }
    /**
     * 로그아웃
     * @param userId
     * @return
     */
    @ApiOperation(value = "로그아웃", notes = "refresh token 삭제 후 로그아웃")
    
    @PostMapping("/logout/{userId}")
    public ResponseEntity<?> logout(@PathVariable int userId){

        try {
            userService.deleteRefreshToken(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    /**
     * 토큰 재발급
     * @param userId
     * @param request
     * @return
     */
    @ApiOperation(value = "access token 재발급", notes = "프론트에서 refresh token을 가져와서 요청 시 access token 재발급, 테스트 필요")
    @PostMapping("/refresh")
    public ResponseEntity<?> reissueToken(@RequestBody int userId, HttpServletRequest request){

        String token = request.getHeader("refreshToken");
        try{
            if(jwtService.checkToken(token) && token.equals(userService.getRefreshToken(userId))){
                String accessToken = jwtService.createAccessToken("id", userId);
                log.debug("토큰 재발급");

                Map<String, Object> result = new HashMap<>();
                result.put("accessToken",accessToken);

                return new ResponseEntity<>(result, HttpStatus.OK);
            }else{
                log.debug("refresh token 만료");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception e){
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "user 정보 반환", notes = "내정보 및 유저상세에 보여줄 정보")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable int userId){

        try {
            //friendTotal, attendTotal, conversationTotal, ddabongTotal, rank 추가 필요
            LoginResponseDto user = userService.findByUserId(userId);

            Map<String, LoginResponseDto> result = new HashMap<>();
            result.put("user",user);

            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "user 정보 수정", notes = "닉네임, 이미지, 비밀번호 수정")
    @PatchMapping
    public ResponseEntity<?> modifyUserInfo(@RequestBody UserModifyRequestDto user){

        try {
            return new ResponseEntity<>(userService.updateUserInfo(user), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "비밀번호 확인", notes = "회원 탈퇴, 비밀번호 수정 요청 시 비밀번호 확인")
    @PostMapping("/check")
    public ResponseEntity<?> checkPassword(@RequestBody UserLoginRequestDto user){

        //소셜 로그인 이용자는 비밀번호 확인 처리 어떻게 할지 고민
        try {
            if(userService.isSamePassword(user)) return new ResponseEntity<>(HttpStatus.OK);
            else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴 요청 시 처리")
    @PatchMapping("/{userId}")
    public ResponseEntity<?> withdraw(@PathVariable int userId){

        //사유도 받아야 함
        try {
            userService.updateUserCd(userId, UserCode.USER_UNREGISTER.getCode()); //유저코드 변경
            userService.deleteRefreshToken(userId); //리프레시토큰 제거
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }
}
