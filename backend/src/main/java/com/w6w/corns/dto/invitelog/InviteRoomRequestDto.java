package com.w6w.corns.dto.invitelog;

import com.w6w.corns.domain.invitelog.InviteLog;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class InviteRoomRequestDto {
    private int fromUserId;
    private int toUserId;
    private int roomNo;

    public InviteLog toEntity() {
        return InviteLog.builder()
                .fromUserId(fromUserId)
                .toUserId(toUserId)
                .roomNo(roomNo)
                .build();
    }
}
