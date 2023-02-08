package com.w6w.corns.service.redis;

import com.w6w.corns.dto.redis.SaveScriptRequestDto;
import com.w6w.corns.dto.room.response.RoomListResponseDto;

import java.util.Map;

public interface RedisService {
    // 스크립트 실시간 저장
    public void saveScript(SaveScriptRequestDto body);
    // 스크립트 파일 생성
    public void makeScriptFile(RoomListResponseDto roomInfo);
    // 스크립트 파일 업로드
    public void uploadScriptFile(int roomNo, int userId, String scriptText);
}
