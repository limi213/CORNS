package com.w6w.corns.service.invitation;

import com.w6w.corns.domain.friend.Friend;
import com.w6w.corns.domain.friend.FriendPK;
import com.w6w.corns.domain.friend.FriendRepository;
import com.w6w.corns.domain.friendlog.FriendLogRepository;
import com.w6w.corns.domain.invitelog.InviteLog;
import com.w6w.corns.domain.invitelog.InviteLogRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.friend.*;
import com.w6w.corns.dto.invitelog.InviteRoomListResponseDto;
import com.w6w.corns.dto.invitelog.InviteRoomRequestDto;
import com.w6w.corns.service.friend.FriendService;
import com.w6w.corns.service.redis.RedisService;
import com.w6w.corns.service.subject.SubjectService;
import com.w6w.corns.util.PageableResponseDto;
import com.w6w.corns.util.code.FriendCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvitationServiceImpl implements InvitationService {

    private final SubjectService subjectService;

    private final RedisService redisService;

    private final InviteLogRepository inviteLogRepo;

    //쫑알룸 초대
    @Override
    public void addInviteLog(InviteRoomRequestDto inviteRoomRequestDto) {
        inviteLogRepo.save(inviteRoomRequestDto.toEntity());

        //초대받은 유저 새 알림 처리
        redisService.updateNotify(inviteRoomRequestDto.getToUserId(), 1, true);
    }

    //쫑알룸 초대 목록 가져오기
    @Override
    public List<InviteRoomListResponseDto> getInviteRoomList(int userId) {
        List<InviteRoomListResponseDto> roomList = inviteLogRepo.findInviteRoomByUserId(userId);
        roomList.stream().forEach(room -> {
            String subjectValue = subjectService.findById(room.getInviteRoom().getSubjectNo()).getValue();
            room.getInviteRoom().setSubjectValue(subjectValue);
        });

        return roomList;
    }

    //쫑알룸 초대 로그 삭제
    @Override
    public void removeInviteLog(int inviteLogNo) {
        inviteLogRepo.deleteById(inviteLogNo);
    }
}
