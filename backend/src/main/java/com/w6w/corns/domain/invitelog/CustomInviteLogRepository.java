package com.w6w.corns.domain.invitelog;

import com.w6w.corns.domain.room.Room;
import com.w6w.corns.dto.invitelog.InviteRoomListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.ArrayList;
import java.util.List;

public interface CustomInviteLogRepository {
    // 쫑알룸 초대 리스트 조회
    List<InviteRoomListResponseDto> findInviteRoomByUserId(int userId);
}
