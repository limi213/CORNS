package com.w6w.corns.dto.conversationlog;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class RoomBookmarkRequestDto {
    private int roomNo;
    private int userId;
    private boolean doRegister;
}
