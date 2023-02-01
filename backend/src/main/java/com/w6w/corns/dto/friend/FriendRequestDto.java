package com.w6w.corns.dto.friend;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class FriendRequestDto {
    private int fromId;
    private int toId;
}
