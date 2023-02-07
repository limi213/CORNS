package com.w6w.corns.dto.friend;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class FriendRecvListResponseDto {
    private int userId;
    private String nickname;
    private String imgUrl;
    private String message;
}
