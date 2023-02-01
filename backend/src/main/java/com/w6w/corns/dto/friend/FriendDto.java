package com.w6w.corns.dto.friend;

import com.w6w.corns.domain.friend.Friend;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class FriendDto {
    private int userIdA;
    private int userIdB;
    private int friendCd;

    public Friend toEntity() {
        return Friend.builder()
                .userIdA(userIdA)
                .userIdB(userIdB)
                .friendCd(friendCd)
                .build();
    }
}
