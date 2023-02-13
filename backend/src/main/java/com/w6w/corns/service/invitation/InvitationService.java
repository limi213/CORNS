package com.w6w.corns.service.invitation;

import com.w6w.corns.dto.friend.FriendListRequestDto;
import com.w6w.corns.dto.invitelog.InviteRoomListResponseDto;
import com.w6w.corns.dto.invitelog.InviteRoomRequestDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InvitationService {
    //쫑알룸 초대
    void addInviteLog(InviteRoomRequestDto inviteRoomRequestDto);
    //쫑알룸 초대 목록 가져오기
    List<InviteRoomListResponseDto> getInviteRoomList(int userId);
}
