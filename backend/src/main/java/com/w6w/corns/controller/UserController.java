package com.w6w.corns.controller;

import com.w6w.corns.dto.user.*;
import com.w6w.corns.dto.withdraw.WithdrawRequestDto;
import com.w6w.corns.service.friend.FriendService;
import com.w6w.corns.util.PageableResponseDto;
import com.w6w.corns.service.jwt.JwtService;
import com.w6w.corns.service.oauth.OAuthService;
import com.w6w.corns.service.user.UserService;
import com.w6w.corns.util.Constant.SocialType;
import io.swagger.annotations.Api;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
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
    private final OAuthService oAuthService;
    private final FriendService friendService;

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
     * @param requestDto
     * @return
     */
    @ApiOperation(value = "이메일 회원가입", notes = "기본 회원가입으로 이메일과 비밀번호, 닉네임을 받아 회원가입 진행")
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserJoinRequestDto requestDto){
        try {
            log.debug("requestDto : {}", requestDto);
            int result = userService.signUp(requestDto);

            if(result < 0) return new ResponseEntity<>(HttpStatus.CONFLICT); //중복 이메일
            else return new ResponseEntity<HttpStatus>(HttpStatus.OK); //회원가입 성공

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    /**
     * 회원가입 진행에 필요한 이메일 중복 확인
     * @param email
     * @return
     */
    @ApiOperation(value = "이메일 중복 확인", notes = "기본 회원가입 진행 중 입력 이메일 중복 확인")
    @GetMapping("/email-check/{email}")
    public ResponseEntity<?> checkDuplicateEmail(@PathVariable String email){

        try {
            log.debug("email : {}", email);
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
     * @param requestDto
     * @return
     */
    @Transactional
    @ApiOperation(value = "기본 로그인", notes = "이메일, 비밀번호를 통한 로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto requestDto){

        try {
            log.debug("requestDto = {}", requestDto);

            Map<String, Object> result = new HashMap<>();
            UserDetailResponseDto responseDto = userService.login(requestDto);

            if(responseDto == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); //로그인 실패
            else{
                String[] tokens = userService.giveToken(responseDto.getUserId());

                String accessToken = tokens[0];
                String refreshToken = tokens[1];

                //lastLoginTm 갱신
                userService.checkAttendance(responseDto);

                //로그인로그
                userService.makeLoginLog(responseDto.getUserId());
                responseDto = userService.findByEmail(responseDto.getEmail()); //제일 마지막으로 업데이트된 유저 정보

                log.debug("responseDto : {}", responseDto);

                result.put("accessToken", accessToken);
                result.put("refreshToken", refreshToken);
                result.put("loginUser", responseDto);

                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        } catch (Exception e) {
            log.error("로그인 실패 "+ e);
            return exceptionHandling(e);
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
            log.debug("code : {}", code);

            Map<String, Object> result = new HashMap<>();

            Map<String, Object> map = oAuthService.oAuthLogin(socialType, code);

            //탈퇴 또는 이용정지 회원
            if(map == null || map.isEmpty()) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            
            UserDetailResponseDto responseDto = (UserDetailResponseDto) map.get("responseDto");

            //토큰
            String[] tokens = userService.giveToken(responseDto.getUserId());

            String accessToken = tokens[0];
            String refreshToken = tokens[1];

            //구글로 로그인한 사용자임을 알리기
            responseDto.setGoogle(true);

            //lastLoginTm 갱신
            userService.checkAttendance(responseDto);

            //로그인로그
            userService.makeLoginLog(responseDto.getUserId());

            //제일 마지막으로 업데이트된 유저 정보
            responseDto = userService.findByEmail(responseDto.getEmail());
            log.debug("responseDto : {}", responseDto);

            result.put("accessToken", accessToken);
            result.put("refreshToken", refreshToken);
            result.put("loginUser", responseDto);
            if(map.get("message") != null) result.put("isCombine", true);

            return new ResponseEntity<>(result, HttpStatus.OK);
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
     * @param map
     * @param request
     * @return
     */
    @ApiOperation(value = "access token 재발급", notes = "프론트에서 refresh token을 가져와서 요청 시 access token 재발급, 테스트 필요")
    @PostMapping("/refresh")
    public ResponseEntity<?> reissueToken(@RequestBody Map<String, Object> map, HttpServletRequest request){

        int userId = Integer.parseInt((String)map.get("userId"));
        log.debug("userId : {}", userId);
        String token = request.getHeader("refreshtoken");
        try{
            if(jwtService.checkToken(token) && token.equals(userService.getRefreshToken(userId))){

                String accessToken = jwtService.createAccessToken("id", userId);
                log.debug("reissue");

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

    /**
     *
     * @param userId
     * @return 본인 회원 정보 반환 -> 내정보랑 회원정보보기.?
     */
    @ApiOperation(value = "회원 정보 반환", notes = "내정보 및 유저상세에 보여줄 정보")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable int userId){

        try {
            //rank 추가 필요
            UserDetailResponseDto responseDto = userService.getUser(userId);

            Map<String, UserDetailResponseDto> result = new HashMap<>();
            result.put("user",responseDto);

            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "user 정보 수정", notes = "닉네임, 이미지 수정")
    @PutMapping
    public ResponseEntity<?> modifyUserInfo(@RequestPart UserModifyRequestDto modifyRequestDto,
                                            @RequestParam(required = false) MultipartFile multipartFile){

        try {
            log.debug("modifyRequestDto = " + modifyRequestDto.toString() + ", multipartFile = " + multipartFile);
            UserResponseDto user = userService.updateUserInfo(modifyRequestDto, multipartFile);
            log.debug("user : {}", user);
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "비밀번호 확인 및 변경", notes = "userId, 비밀번호, 새로운 비밀번호를 넘겨 인증 후 변경")
    @PatchMapping
    public ResponseEntity<?> modifyPassword(@RequestBody UserPassModifyRequestDto requestDto){

        try{
            if(!userService.updateUserPassword(requestDto)) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            else return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴 요청 시 처리")
    @PostMapping
    public ResponseEntity<?> withdraw(@RequestBody WithdrawRequestDto requestDto){

        try {
            userService.withdrawUser(requestDto);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "회원 검색", notes = "조건에 맞는 회원을 검색해서 목록 반환")
    @GetMapping
    public ResponseEntity<?> search(Pageable pageable, @RequestParam String baseTime, @RequestParam String filter, @RequestParam String keyword){

        try {
            PageableResponseDto responseDto = userService.findAllUserByCondition(pageable, baseTime, filter, keyword);

            if(responseDto != null && responseDto.getList().size() > 0) return new ResponseEntity<>(responseDto, HttpStatus.OK);
            else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "알맹 상세 정보", notes = "from이 to의 상세정보를 봤을 때의 정보와 친구 관계를 반환")
    @GetMapping("/{fromId}/{toId}")
    public ResponseEntity<?> showDetail(@PathVariable int fromId, @PathVariable int toId) {

        try {
            log.debug("fromId : {}, toId : {}", fromId, toId);

            //유저정보 불러오기
            UserDetailResponseDto responseDto = userService.getUser(toId);

            //관계 반환
            int relation = friendService.getFriendRelation(fromId, toId);

            Map<String, Object> result = new HashMap<>();
            result.put("user", responseDto);
            result.put("relation", relation);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }
}
