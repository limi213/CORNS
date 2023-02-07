package com.w6w.corns.dto.conversationlog;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class RoomMemberDto {
    private int userId;
    private String nickname;
    private String imgUrl;
    private int thumbCnt;
    private String speaking;
    private String scriptUrl;
}
