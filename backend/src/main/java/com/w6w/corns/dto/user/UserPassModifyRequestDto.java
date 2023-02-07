package com.w6w.corns.dto.user;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value="유저 비밀번호 변경 요청 정보")
public class UserPassModifyRequestDto {

    private int userId;

    private String password;

    private String newPassword;
}
