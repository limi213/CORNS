package com.w6w.corns.dto.friend;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class FriendListResponseDto {
    private int userId;
    private String nickname;
    private String imgUrl;
    private int levelNo;
}
