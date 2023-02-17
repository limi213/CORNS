package com.w6w.corns.dto.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class GoogleOAuthToken {

    private String access_token;
    private int expires_in;
    private String scope;
    private String token_type;
    private String id_token;
}
