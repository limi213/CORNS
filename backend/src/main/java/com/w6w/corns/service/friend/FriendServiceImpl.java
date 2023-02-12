package com.w6w.corns.service.friend;

import com.w6w.corns.domain.friend.Friend;
import com.w6w.corns.domain.friend.FriendPK;
import com.w6w.corns.domain.friend.FriendRepository;
import com.w6w.corns.domain.friendlog.FriendLogRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.friend.*;
import com.w6w.corns.service.redis.RedisService;
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
public class FriendServiceImpl implements FriendService {

    private final RedisService redisService;

    private final FriendLogRepository friendLogRepo;

    private final FriendRepository friendRepo;

    private final UserRepository userRepo;

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
        //friend 테이블에 insert
        friendRepo.save(FriendDto.builder()
                            .userIdA(friendRequestDto.getFromId())
                            .userIdB(friendRequestDto.getToId())
                            .friendCd(FriendCode.FRIEND_SEND_A2B.getCode())
                            .build()
                            .toEntity());

        friendRepo.save(FriendDto.builder()
                            .userIdA(friendRequestDto.getToId())
                            .userIdB(friendRequestDto.getFromId())
                            .friendCd(FriendCode.FRIEND_SEND_B2A.getCode())
                            .message(friendRequestDto.getMessage())
                            .build()
                            .toEntity());

        //신청받은 유저 새 알림 처리
        redisService.updateNotify(friendRequestDto.getToId(), true);
    }

    //친구 수락
    @Override
    @Transactional
    public void acceptFriend(FriendRequestDto friendRequestDto) {
        //friend 테이블에서 코드 수정
        Friend relation1 = friendRepo.findById(FriendPK.builder()
                                                .userIdA(friendRequestDto.getFromId())
                                                .userIdB(friendRequestDto.getToId())
                                                .build()).get();
        relation1.setFriendCd(FriendCode.FRIEND_ACCEPT.getCode());
        friendRepo.save(relation1);

        Friend relation2 = friendRepo.findById(FriendPK.builder()
                                                .userIdA(friendRequestDto.getToId())
                                                .userIdB(friendRequestDto.getFromId())
                                                .build()).get();
        relation2.setFriendCd(FriendCode.FRIEND_ACCEPT.getCode());
        friendRepo.save(relation2);

        //유저 누적 친구수 증가
        User fromUser = userRepo.findById(friendRequestDto.getFromId()).get();
        fromUser.setFriendTotal(fromUser.getFriendTotal()+1);
        userRepo.save(fromUser);

        User toUser = userRepo.findById(friendRequestDto.getToId()).get();
        toUser.setFriendTotal(toUser.getFriendTotal()+1);
        userRepo.save(toUser);
    }

    //친구 거절
    @Override
    @Transactional
    public void rejectFriend(FriendRequestDto friendRequestDto) {
        //friend 테이블에서 코드 수정
        Friend relation1 = friendRepo.findById(FriendPK.builder()
                                                .userIdA(friendRequestDto.getFromId())
                                                .userIdB(friendRequestDto.getToId())
                                                .build()).get();
        friendRepo.delete(relation1);

        Friend relation2 = friendRepo.findById(FriendPK.builder()
                                                .userIdA(friendRequestDto.getToId())
                                                .userIdB(friendRequestDto.getFromId())
                                                .build()).get();
        friendRepo.delete(relation2);
    }

    //친구 삭제
    @Override
    @Transactional
    public void deleteFriend(FriendRequestDto friendRequestDto) {
        //friend 테이블에서 코드 수정
        Friend relation1 = friendRepo.findById(FriendPK.builder()
                                                .userIdA(friendRequestDto.getFromId())
                                                .userIdB(friendRequestDto.getToId())
                                                .build()).get();
        friendRepo.delete(relation1);

        Friend relation2 = friendRepo.findById(FriendPK.builder()
                                                .userIdA(friendRequestDto.getToId())
                                                .userIdB(friendRequestDto.getFromId())
                                                .build()).get();
        friendRepo.delete(relation2);

        //유저 누적 친구수 감소
        User fromUser = userRepo.findById(friendRequestDto.getFromId()).get();
        fromUser.setFriendTotal(fromUser.getFriendTotal()-1);
        userRepo.save(fromUser);

        User toUser = userRepo.findById(friendRequestDto.getToId()).get();
        toUser.setFriendTotal(toUser.getFriendTotal()-1);
        userRepo.save(toUser);
    }

    //친구 목록 가져오기
    @Override
    @Transactional(readOnly = true)
    public PageableResponseDto getFriendList(int userId, FriendListRequestDto friendListRequestDto, Pageable pageable) {
        Slice<FriendListResponseDto> friendList = friendRepo.findFriendByKeyword(friendListRequestDto, userId, pageable);
        return new PageableResponseDto(friendList.hasNext(), friendList.getContent());
    }

    //친구 신청 목록 가져오기
    @Override
    @Transactional(readOnly = true)
    public List<FriendRecvListResponseDto> getFriendReceiveList(int userId) {
        List<Friend> friendRecvList = friendRepo.findByUserIdAAndFriendCd(userId, FriendCode.FRIEND_SEND_B2A.getCode());
        List<FriendRecvListResponseDto> friendRecvDtoList = new ArrayList<>();

        friendRecvList.stream().forEach(friend -> {
            User user = userRepo.findById(friend.getUserIdB()).get();
            friendRecvDtoList.add(FriendRecvListResponseDto.builder()
                                            .userId(user.getUserId())
                                            .nickname(user.getNickname())
                                            .imgUrl(user.getImgUrl())
                                            .message(friend.getMessage())
                                            .build());
        });

        return friendRecvDtoList;
    }

    //친구 관계
    @Override
    @Transactional(readOnly = true)
    public int getFriendRelation(int fromId, int toId) {
        int NOTHING = 0, SEND = 1, RECEIVE = 2, FRIEND = 3;
        int relation = NOTHING;

        Optional<Friend> friend = friendRepo.findById(FriendPK.builder()
                                                        .userIdA(fromId)
                                                        .userIdB(toId)
                                                        .build());

        if (friend.isPresent()) {
            int friendCd = friend.get().getFriendCd();

            if (friendCd == FriendCode.FRIEND_SEND_A2B.getCode()) {
                relation = SEND;
            } else if (friendCd == FriendCode.FRIEND_SEND_B2A.getCode()) {
               relation = RECEIVE;
            } else if (friendCd == FriendCode.FRIEND_ACCEPT.getCode()) {
                relation = FRIEND;
            }
        }
        return relation;
    }

}
