package com.w6w.corns.service.friend;

import com.w6w.corns.domain.friend.Friend;
import com.w6w.corns.domain.friend.FriendRepository;
import com.w6w.corns.domain.friendlog.FriendLogRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.friend.*;
import com.w6w.corns.util.code.FriendCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    @Autowired
    FriendLogRepository friendLogRepo;

    @Autowired
    FriendRepository friendRepo;

    @Autowired
    UserRepository userRepo;

    //친구로그 추가
    @Override
    @Transactional
    public void addFriendLog(FriendRequestDto friendRequestDto, int friendLogCd) {
        friendLogRepo.save(FriendLogDto.builder()
                                .fromUserId(friendRequestDto.getFromId())
                                .toUserId(friendRequestDto.getToId())
                                .friendLogCd(friendLogCd)
                                .build()
                                .toEntity());
    }

    //친구 신청
    @Override
    @Transactional
    public void sendFriend(FriendRequestDto friendRequestDto) {
        int userIdA = Math.min(friendRequestDto.getFromId(), friendRequestDto.getToId());
        int userIdB = Math.max(friendRequestDto.getFromId(), friendRequestDto.getToId());

        int friendCd = 0;
        if (friendRequestDto.getFromId() == userIdA) {
            friendCd = FriendCode.FRIEND_SEND_A2B.getCode();
        } else {
            friendCd = FriendCode.FRIEND_SEND_B2A.getCode();
        }

        friendRepo.save(FriendDto.builder()
                            .userIdA(userIdA)
                            .userIdB(userIdB)
                            .friendCd(friendCd)
                            .build()
                            .toEntity());
    }

    //친구 수락
    @Override
    @Transactional
    public void acceptFriend(FriendRequestDto friendRequestDto) {
        int userIdA = Math.min(friendRequestDto.getFromId(), friendRequestDto.getToId());
        int userIdB = Math.max(friendRequestDto.getFromId(), friendRequestDto.getToId());

        Friend friend = friendRepo.findByUserIdAAndUserIdB(userIdA, userIdB);
        friend.setFriendCd(FriendCode.FRIEND_ACCEPT.getCode());
        friendRepo.save(friend);
    }

    //친구 거절
    @Override
    @Transactional
    public void rejectFriend(FriendRequestDto friendRequestDto) {
        int userIdA = Math.min(friendRequestDto.getFromId(), friendRequestDto.getToId());
        int userIdB = Math.max(friendRequestDto.getFromId(), friendRequestDto.getToId());

        Friend friend = friendRepo.findByUserIdAAndUserIdB(userIdA, userIdB);
        friendRepo.delete(friend);
    }

    //친구 삭제
    @Override
    @Transactional
    public void deleteFriend(FriendRequestDto friendRequestDto) {
        int userIdA = Math.min(friendRequestDto.getFromId(), friendRequestDto.getToId());
        int userIdB = Math.max(friendRequestDto.getFromId(), friendRequestDto.getToId());

        Friend friend = friendRepo.findByUserIdAAndUserIdB(userIdA, userIdB);
        friendRepo.delete(friend);
    }

    //친구 목록 가져오기
    @Override
    @Transactional(readOnly = true)
    public Slice<FriendListInterface> getFriendList(int userId, FriendListRequestDto friendListRequestDto, Pageable pageable) {
        Slice<FriendListInterface> sliceList = null;

        friendListRequestDto.setUserId(userId);
        if (friendListRequestDto.getKeyword() == null) friendListRequestDto.setKeyword("");

        if (friendListRequestDto.getFilter() == 0) {
            //닉네임 검색
            sliceList = friendRepo.findFriendByNickname(friendListRequestDto.getUserId(),
                                                        friendListRequestDto.getKeyword(),
                                                        friendListRequestDto.getBaseTime(),
                                                        FriendCode.FRIEND_ACCEPT.getCode(),
                                                        pageable);

        } else if (friendListRequestDto.getFilter() == 1) {
            //아이디 검색
            sliceList = friendRepo.findFriendByUserId(friendListRequestDto.getUserId(),
                                                        Integer.parseInt(friendListRequestDto.getKeyword()),
                                                        friendListRequestDto.getBaseTime(),
                                                        FriendCode.FRIEND_ACCEPT.getCode(),
                                                        pageable);
        }

        return sliceList;
    }

    //친구 신청 목록 가져오기
    @Override
    @Transactional(readOnly = true)
    public List<FriendListResponseDto> getFriendReceiveList(int userId) {
        List<FriendListResponseDto> friendRecvList = new ArrayList<>();
        List<Integer> userListA = friendRepo.findByUserIdAAndFriendCd(userId, FriendCode.FRIEND_SEND_B2A.getCode())
                                            .stream()
                                            .map(Friend::getUserIdB)
                                            .collect(Collectors.toList());
        List<Integer> userListB = friendRepo.findByUserIdBAndFriendCd(userId, FriendCode.FRIEND_SEND_A2B.getCode())
                                            .stream()
                                            .map(Friend::getUserIdA)
                                            .collect(Collectors.toList());


        setUserInfo(friendRecvList, userListA);
        setUserInfo(friendRecvList, userListB);

        return friendRecvList;
    }

    //친구 정보 세팅
    @Override
    public void setUserInfo(List<FriendListResponseDto> friendRecvDtoList, List<Integer> friendList) {
        for (int userId : friendList) {
            User user = userRepo.findById(userId).get();
            friendRecvDtoList.add(FriendListResponseDto.builder()
                                    .userId(user.getUserId())
                                    .nickname(user.getNickname())
                                    .imgUrl(user.getImgUrl())
                                    .levelNo(user.getLevel().getLevelNo())
                                    .build());
        }
    }

    //친구 관계
    @Override
    @Transactional(readOnly = true)
    public int getFriendRelation(int fromId, int toId) {
        int NOTHING = 0, SEND = 1, RECEIVE = 2, FRIEND = 3;
        int relation = NOTHING;

        int userIdA = Math.min(fromId, toId);
        int userIdB = Math.max(fromId, toId);
        Friend friend = friendRepo.findByUserIdAAndUserIdB(userIdA, userIdB);

        if (friend != null) {
            int friendCd = friend.getFriendCd();

            if (friendCd == FriendCode.FRIEND_SEND_A2B.getCode()) {
                if (fromId == userIdA) {
                    relation = SEND;
                } else {
                    relation = RECEIVE;
                }

            } else if (friendCd == FriendCode.FRIEND_SEND_B2A.getCode()) {
                if (fromId == userIdA) {
                    relation = RECEIVE;
                } else {
                    relation = SEND;
                }

            } else if (friendCd == FriendCode.FRIEND_ACCEPT.getCode()) {
                relation = FRIEND;
            }
        }
        return relation;
    }

}
