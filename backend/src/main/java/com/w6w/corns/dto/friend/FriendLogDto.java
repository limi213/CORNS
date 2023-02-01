package com.w6w.corns.dto.friend;

import com.w6w.corns.domain.friendlog.FriendLog;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class FriendLogDto {
    private int fromUserId;
    private int toUserId;
    private int friendLogCd;

    public FriendLog toEntity() {
        return FriendLog.builder()
                .fromUserId(fromUserId)
                .toUserId(toUserId)
                .friendLogCd(friendLogCd)
                .build();
    }
}
