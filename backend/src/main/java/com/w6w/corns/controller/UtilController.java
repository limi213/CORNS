package com.w6w.corns.controller;

import com.w6w.corns.dto.util.TranslationDto;
import com.w6w.corns.dto.util.TranslationResult;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/util")
public class UtilController {
    @Value("${papago.clientId}")
    private String clientId;
    @Value("${papago.clientSecret}")
    private String clientSecret;

    @ApiOperation(value = "번역 api 호출", notes = "en->ko, ko->en 으로 번역 기능")
    @PostMapping("/translation")
    public ResponseEntity<?> translation(@RequestBody TranslationDto requestDto){

        String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
        String text;
        try {
            text = URLEncoder.encode(requestDto.getText(), "UTF-8");
        } catch (Exception e) {
            throw new RuntimeException("인코딩 실패", e);
        }

        String postParams = "source=" + requestDto.getSource() + "&target=" +
                requestDto.getTarget() +  "&text=" + text; //원본언어: 한국어 (ko) -> 목적언어: 영어 (en)

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);

        String responseBody = callApi(apiURL, requestHeaders, postParams);


        JsonParser parser = new JsonParser();
        JsonObject obj = (JsonObject)parser.parse(responseBody);

        //json -> hashmap으로 변환
        //Gson : java Object > JSON, JSON > java Object로 변환을 도와주는 라이브러리
        Gson gson =new Gson();
        TranslationResult result =new TranslationResult();
        result = (TranslationResult)gson.fromJson(obj, result.getClass());

        Map resultmap = new HashMap<>();
        resultmap.put("result",result.getMessage().getResult().getTranslatedText());
        HttpStatus status = HttpStatus.OK;
//
//        try {
//            List<TranslationResponseDto> recvList = friendService.getFriendReceiveList(userId);
//
//            if (recvList.isEmpty()) {
//                status = HttpStatus.NO_CONTENT;
//            } else {
//                resultmap.put("recvList", recvList);
//                status = HttpStatus.OK;
//            }
//
//        } catch (Exception e) {
//            resultmap.put("message", e.getMessage());
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//        }
//
        return new ResponseEntity<Map>(resultmap, status);
    }

    private static String callApi(String apiUrl, Map<String, String> requestHeaders, String postParams){
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("POST");
            for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        }
        finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl){
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body){
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
}
