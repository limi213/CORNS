package com.w6w.corns.dto.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetSocialOauthRes {

    private String jwtToken;
    private int userId;
    private String accessToken;
    private String tokenType;
}
