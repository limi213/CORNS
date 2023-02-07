package com.w6w.corns.service.oauth;

import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.oauth.GoogleOAuthToken;
import com.w6w.corns.dto.oauth.GoogleUserDto;
import com.w6w.corns.dto.user.UserDetailResponseDto;
import com.w6w.corns.service.jwt.JwtService;
import com.w6w.corns.util.Constant.SocialType;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService{

    private final GoogleOauth googleOauth;
    private final UserRepository userRepository;

    @Override
    public Map<String, Object> oAuthLogin(SocialType socialType, String code) throws Exception {

        switch (socialType){
            case GOOGLE:
                //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
                ResponseEntity<String> accessTokenResponse = googleOauth.requestAccessToken(code);

                //응답 객체 JSON을 역직렬화해서 자바 객체에 담음
                GoogleOAuthToken oAuthToken = googleOauth.getAccessToken(accessTokenResponse);

                //액세스 토큰을 다시 구글로 보내서 구글에 저장된 사용자 정보 담긴 응답 객체 받아옴
                ResponseEntity<String> userInfoResponse = googleOauth.requestUserInfo(oAuthToken);

                //JSON을 역직렬화하여 자바 객체에 담음
                GoogleUserDto googleUser = googleOauth.getUserInfo(userInfoResponse);

                User user = userRepository.findByEmail(googleUser.getEmail());

                Map<String, Object> map = new HashMap<>();
                if(user == null){ //새로운 회원

                    user.setEmail(googleUser.getEmail());
                    user.setSocial(2);
                    user.setImgUrl(googleUser.getImgUrl());
                    userRepository.save(user);

                }else if((user.getSocial() & (1 << 1)) == 0){ //기본 로그인으로만 등록되어있던 회원
                    //후에 소셜로그인 enum으로 관리하면 함수 따로 만들기
                    user.setUserCd(user.getSocial() & (1 << 1));
                    userRepository.save(user);
                    map.put("message", "통합");
                }
                UserDetailResponseDto loginResponseDto = UserDetailResponseDto.fromEntity(user);

                map.put("responseDto", loginResponseDto);

                return map;

            default:
                throw new IllegalArgumentException();
        }

    }
}
