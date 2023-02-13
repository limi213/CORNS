package com.w6w.corns.dto.invitelog;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class InviteUserDto {
    private int userId;
    private String nickname;
    private String imgUrl;
}
