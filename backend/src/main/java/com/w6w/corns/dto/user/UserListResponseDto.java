package com.w6w.corns.dto.user;

import com.w6w.corns.domain.user.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserListResponseDto {

    private int userId;

    private String imgUrl;

    private String nickname;

    private int level;
}
