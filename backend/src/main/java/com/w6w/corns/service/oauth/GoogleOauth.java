package com.w6w.corns.service.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.w6w.corns.dto.oauth.GoogleOAuthToken;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.w6w.corns.dto.oauth.GoogleUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class GoogleOauth implements SocialOauth{

    @Value("${OAuth2.google.url}")
    private String GOOGLE_SNS_LOGIN_URL;

    @Value("${OAuth2.google.client-id}")
    private String GOOGLE_SNS_CLIENT_ID;

    @Value("${OAuth2.google.client-secret}")
    private String GOOGLE_SNS_CLIENT_SECRET;

    @Value("${OAuth2.google.callback-url}")
    private String GOOGLE_SNS_CALLBACK_URL;

    @Value("${OAuth2.google.scope}")
    private String GOOGLE_DATA_ACCESS_SCOPE;

    private final ObjectMapper objectMapper;

    /**
     * https://accounts.google.com/o/oauth2/v2/auth?scope=profile&response_type=code&client_id=""&redirect_uri=""
     * @return
     */
    @Override
    public String getOathRedirectURL() {

        Map<String, Object> params = new HashMap<>();

        System.out.println("GOOGLE_SNS_LOGIN_URL = " + GOOGLE_SNS_LOGIN_URL);
        params.put("scope", GOOGLE_DATA_ACCESS_SCOPE);
        params.put("response_type", "code");
        params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
        params.put("client_id", GOOGLE_SNS_CLIENT_ID);

        String parameterString = params.entrySet().stream()
                .map(x->x.getKey()+"="+x.getValue())
                .collect(Collectors.joining("&"));

        String redirectURL = GOOGLE_SNS_LOGIN_URL+"?"+parameterString;

        return redirectURL;
    }

    public ResponseEntity<String> requestAccessToken(String code) {

        String GOOGLE_TOKEN_REQUEST_URL="https://oauth2.googleapis.com/token";

        RestTemplate restTemplate = new RestTemplate(); //다른 서버의 API endpoint 호출시 사용
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        restTemplate.setErrorHandler(new DefaultResponseErrorHandler(){
            @Override
            public boolean hasError(ClientHttpResponse response) throws IOException {

                return response.getStatusCode().series() == HttpStatus.Series.SERVER_ERROR;
            }
        });
        Map<String, Object> params = new HashMap<>();

        params.put("code", code);
        params.put("client_id", GOOGLE_SNS_CLIENT_ID);
        params.put("client_secret", GOOGLE_SNS_CLIENT_SECRET);
        params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
        params.put("grant_type", "authorization_code");

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                GOOGLE_TOKEN_REQUEST_URL,
                params,
                String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity;
        }
        return null;
    }

    /**
     * response에 담긴 JSON을 역직렬화하여 자바 객체에 담는다
     * @param response
     * @return
     * @throws JsonProcessingException
     */
    public GoogleOAuthToken getAccessToken(ResponseEntity<String> response) throws JsonProcessingException {

        GoogleOAuthToken googleOAuthToken= objectMapper.readValue(response.getBody(),GoogleOAuthToken.class);
        return googleOAuthToken;
    }

    public ResponseEntity<String> requestUserInfo(GoogleOAuthToken oAuthToken) {

        String GOOGLE_USERINFO_REQUEST_URL="https://www.googleapis.com/oauth2/v1/userinfo";

        RestTemplate restTemplate = new RestTemplate();

        //header에 accessToken을 담는다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer "+oAuthToken.getAccess_token());

        //HttpEntity를 하나 생성해 헤더를 담아서 restTemplate으로 구글과 통신하게 된다.
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);

        ResponseEntity<String> response=restTemplate.exchange(
                GOOGLE_USERINFO_REQUEST_URL,
                HttpMethod.GET,
                request,
                String.class);

        return response;
    }

    public GoogleUserDto getUserInfo(ResponseEntity<String> userInfoResponse) throws JsonProcessingException {
        //유저가 이미 있는 경우 로그인에 성공한 것으로 판단하여 jwt 토큰 발급해야 함
        return objectMapper.readValue(userInfoResponse.getBody(), GoogleUserDto.class);
    }
}
