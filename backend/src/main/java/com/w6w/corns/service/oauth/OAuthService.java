package com.w6w.corns.service.oauth;

import com.w6w.corns.dto.user.UserDetailResponseDto;
import com.w6w.corns.util.Constant;
import java.io.IOException;

public interface OAuthService {

    void request(Constant.SocialType socialType) throws IOException;
    UserDetailResponseDto oAuthLogin(Constant.SocialType socialType, String code) throws Exception;
}
