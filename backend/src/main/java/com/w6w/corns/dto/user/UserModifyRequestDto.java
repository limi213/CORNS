package com.w6w.corns.dto.user;

import com.w6w.corns.domain.user.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserModifyRequestDto { //나중에 재희언니가 만든 dto 사용할 예정!

    private int userId;
    private String email;
    private String nickname;
    private String imgUrl;
    private String password;

    @Builder
    public UserModifyRequestDto(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.imgUrl = user.getImgUrl();
    }
}
