package com.w6w.corns.service.oauth;

import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.oauth.GetSocialOauthRes;
import com.w6w.corns.dto.oauth.GoogleOAuthToken;
import com.w6w.corns.dto.oauth.GoogleUserDto;
import com.w6w.corns.dto.user.LoginResponseDto;
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
    private final HttpServletResponse response;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public void request(SocialType socialType) throws IOException {

        //각 소셜 로그인 요청 시 소셜로그인 페이지로 리다이렉트
        String redirectURL;
        switch (socialType){
            case GOOGLE:
                redirectURL=googleOauth.getOathRedirectURL();
                System.out.println("redirectURL = " + redirectURL);
                break;
            default:
                throw new IllegalArgumentException();
        }
        response.sendRedirect(redirectURL);
    }

    @Override
    public GetSocialOauthRes oAuthLogin(SocialType socialType, String code) throws IOException {

        switch (socialType){
            case GOOGLE:
                //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
                ResponseEntity<String> accessTokenResponse = googleOauth.requestAccessToken(code);
                System.out.println("accessTokenResponse = " + accessTokenResponse);

                //응답 객체 JSON을 역직렬화해서 자바 객체에 담음
                GoogleOAuthToken oAuthToken = googleOauth.getAccessToken(accessTokenResponse);
                System.out.println("oAuthToken = " + oAuthToken);

                //액세스 토큰을 다시 구글로 보내서 구글에 저장된 사용자 정보 담긴 응답 객체 받아옴
                ResponseEntity<String> userInfoResponse = googleOauth.requestUserInfo(oAuthToken);
                System.out.println("userInfoResponse = " + userInfoResponse);

                //JSON을 역직렬화하여 자바 객체에 담음
                GoogleUserDto googleUser = googleOauth.getUserInfo(userInfoResponse);
                System.out.println("googleUser = " + googleUser);

                LoginResponseDto user = LoginResponseDto
                        .builder()
                        .user(userRepository.findByEmail(googleUser.getEmail()))
                        .build();

                if(user != null){
                    //jwt Token 발급
                    String jwtToken = jwtService.createRefreshToken("id", user.getUserId());
                    GetSocialOauthRes getSocialOauthRes = new GetSocialOauthRes(
                            jwtToken,
                            user.getUserId(),
                            oAuthToken.getAccess_token(),
                            oAuthToken.getToken_type()
                    );

                    return getSocialOauthRes;
                }

            default:
                throw new IllegalArgumentException();
        }

    }
}
