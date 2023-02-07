package com.w6w.corns.service.friend;

import com.w6w.corns.dto.friend.*;
import com.w6w.corns.util.PageableResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface FriendService {
    //친구로그 추가
    void addFriendLog(FriendRequestDto friendRequestDto, int friendLogCd);
    //친구 신청
    void sendFriend(FriendRequestDto friendRequestDto);
    //친구 수락
    void acceptFriend(FriendRequestDto friendRequestDto);
    //친구 거절
    void rejectFriend(FriendRequestDto friendRequestDto);
    //친구 삭제
    void deleteFriend(FriendRequestDto friendRequestDto);
    //친구 목록 가져오기
    PageableResponseDto getFriendList(int userId, FriendListRequestDto friendListRequestDto, Pageable pageable);
    //친구 신청 목록 가져오기
    List<FriendRecvListResponseDto> getFriendReceiveList(int userId);
    //친구 관계
    int getFriendRelation(int fromId, int toId);
}
