package com.w6w.corns.dto.user;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@ToString
@ApiModel(value="유저 응답 정보")
public class UserResponseDto {

    private int userId;

    private String imgUrl;

    private String nickname;

    @Builder
    public UserResponseDto(int userId, String imgUrl, String nickname) {
        this.userId = userId;
        this.imgUrl = imgUrl;
        this.nickname = nickname;
    }

}
