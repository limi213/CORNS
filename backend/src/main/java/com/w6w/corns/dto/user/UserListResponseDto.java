package com.w6w.corns.dto.user;

import com.w6w.corns.domain.user.User;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ApiModel(value="유저 목록 응답 정보")
public class UserListResponseDto {

    private int userId;

    private String imgUrl;

    private String nickname;

    private int level;
}
