package com.w6w.corns.domain.friend;


import com.w6w.corns.dto.friend.FriendListRequestDto;
import com.w6w.corns.dto.friend.FriendListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface CustomFriendRepository {
    Slice<FriendListResponseDto> findFriendByKeyword(FriendListRequestDto friendListRequestDto, int userId, Pageable pageable);
}
