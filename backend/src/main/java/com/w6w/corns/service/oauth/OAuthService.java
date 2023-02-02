package com.w6w.corns.service.oauth;

import com.w6w.corns.dto.oauth.GetSocialOauthRes;
import com.w6w.corns.dto.oauth.GoogleUserDto;
import com.w6w.corns.dto.user.LoginResponseDto;
import com.w6w.corns.util.Constant;
import java.io.IOException;
import java.util.Map;

public interface OAuthService {

    void request(Constant.SocialType socialType) throws IOException;
    LoginResponseDto oAuthLogin(Constant.SocialType socialType, String code) throws Exception;
}
