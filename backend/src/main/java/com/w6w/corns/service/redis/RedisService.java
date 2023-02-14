package com.w6w.corns.service.redis;

import com.w6w.corns.dto.redis.SaveScriptRequestDto;
import com.w6w.corns.dto.room.response.RoomListResponseDto;
import org.springframework.core.io.InputStreamResource;

import java.util.Map;

public interface RedisService {
    // 스크립트 실시간 저장
    public void saveScript(SaveScriptRequestDto body);
    // 스크립트 파일 생성
    public void makeScriptFile(RoomListResponseDto roomInfo);
    // 스크립트 파일 업로드
    public void uploadScriptFile(int roomNo, int userId, String scriptText);
    // 스크립트 파일 다운로드
    public InputStreamResource downloadScriptFile(int roomNo, int userId);
    // 새 알림 여부 조회 (친구 신청)
    public boolean isExistNewNotify(int userId, int category);
    // 알림 읽음 처리
    public void updateNotify(int userId, int category, boolean isRegist);
}
