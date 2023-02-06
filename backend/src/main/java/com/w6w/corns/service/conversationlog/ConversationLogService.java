package com.w6w.corns.service.conversationlog;

import com.w6w.corns.dto.conversationlog.RoomBookmarkRequestDto;
import com.w6w.corns.dto.conversationlog.RoomLogFilterDto;
import com.w6w.corns.dto.conversationlog.RoomLogResponseDto;
import com.w6w.corns.dto.conversationlog.RoomMemberDto;
import com.w6w.corns.util.PageableResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ConversationLogService {
    //유저가 참여했던 쫑알로그 리스트 조회
    PageableResponseDto getLogList(RoomLogFilterDto roomLogFilterDto, String baseTime, int userId, Pageable pageable);
    //대화(방) 상세정보 조회
    RoomLogResponseDto getRoomLogInfo(int roomNo, int userId);
    //참여자 대화 결과 리스트 조회
    List<RoomMemberDto> getMemberResultList(int roomNo);
    //즐겨찾기 등록/해제
    void changeBookmark(RoomBookmarkRequestDto roomBookmarkRequestDto);
}
