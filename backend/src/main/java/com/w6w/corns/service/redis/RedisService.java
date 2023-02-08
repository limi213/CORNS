package com.w6w.corns.service.redis;

import com.w6w.corns.dto.redis.SaveScriptRequestDto;
import com.w6w.corns.dto.room.response.RoomListResponseDto;
import com.w6w.corns.dto.room.response.RoomResponseDto;

import java.util.Map;

public interface RedisService {
    // 스크립트 실시간 저장
    public void saveScript(SaveScriptRequestDto body);
    // 스크립트 파일 생성 후 업로드
    public void makeScriptFile(RoomListResponseDto roomInfo);
}
