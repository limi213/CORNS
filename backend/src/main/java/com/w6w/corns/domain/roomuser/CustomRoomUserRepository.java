package com.w6w.corns.domain.roomuser;

import com.w6w.corns.dto.conversationlog.RoomLogFilterDto;
import com.w6w.corns.dto.conversationlog.RoomLogResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface CustomRoomUserRepository {
    // 대화에 참여했던(중도 퇴장 포함) 유저 리스트 조회
    List<Integer> findUserByRoomNo(int roomNo);
    // 유저가 참여했던 쫑알로그를 필터에 따라 조회 후 페이징
    Slice<RoomLogResponseDto> findLogByUserIdAndFilter(RoomLogFilterDto roomLogFilterDto, String baseTime, int userId, Pageable pageable);
}
