package com.w6w.corns.service.growth;

import com.w6w.corns.dto.explog.ExpLogRequestDto;
import com.w6w.corns.dto.explog.ExpLogResponseDto;
import com.w6w.corns.dto.indicator.IndicatorResponseDto;
import com.w6w.corns.dto.indicator.SubjectRatioResponseDto;
import com.w6w.corns.dto.level.LevelDto;
import java.util.List;
import java.util.Map;

import com.w6w.corns.util.PageableResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface GrowthService {
    //경험치 상위 백분위 계산
    int calExpPercentile(int userId) throws Exception;
    //유저의 레벨 정보 반환
    Map<String, Object> getUserLevel(int userId) throws Exception;
    //유저의 경험치 목록 반환
    PageableResponseDto getExpLogList(int userId, Pageable pageable, String baseTime) throws Exception;
    //Dto를 이용해서 유저에게 경험치 부여
    void giveExp(ExpLogRequestDto expLogRequestDto);
    //출석률 반환
    int calAttendanceRate(int userId) throws Exception;
    //최근 일주일 일별 대화량
    List<IndicatorResponseDto> calDailySpeakingTotalByWeek(int userId) throws Exception;
    //주제별 비율 계산
    List<SubjectRatioResponseDto> countBySubject(int userId) throws Exception;
    //일일 경험치 획득량 계산
    Map<String, Object> calDailyGainedExp(int userId) throws Exception;
}
