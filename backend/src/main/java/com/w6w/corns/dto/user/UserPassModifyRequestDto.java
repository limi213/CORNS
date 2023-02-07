package com.w6w.corns.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPassModifyRequestDto {

    private int userId;

    private String password;

    private String newPassword;
}
