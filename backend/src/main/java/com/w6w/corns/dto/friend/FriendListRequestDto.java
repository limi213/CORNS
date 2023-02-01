package com.w6w.corns.dto.friend;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class FriendListRequestDto {
    private int userId;
    private int filter;
    private String keyword;
    private String baseTime;
}
