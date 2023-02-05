package com.w6w.corns.service.growth;

import com.w6w.corns.dto.explog.ExpLogRequestDto;
import com.w6w.corns.dto.explog.ExpLogResponseDto;
import com.w6w.corns.dto.level.LevelDto;
import java.util.List;

import com.w6w.corns.util.PageableResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface GrowthService {
    //경험치 상위 백분위 계산
    int calExpPercentile(int userId) throws Exception;
    //유저의 레벨 정보 반환
    LevelDto getUserLevel(int userId) throws Exception;
    //유저의 경험치 목록 반환
    PageableResponseDto getExpLogList(int userId, Pageable pageable, String baseTime) throws Exception;
    //Dto를 이용해서 유저에게 경험치 부여
    void giveExp(ExpLogRequestDto expLogRequestDto);
    //출석률 반환
    int calAttendanceRate(int userId) throws Exception;
    //주제별 비율 계산
    void calSubjectRaio(int userId) throws Exception;
}
