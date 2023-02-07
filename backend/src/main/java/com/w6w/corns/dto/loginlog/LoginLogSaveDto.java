package com.w6w.corns.dto.loginlog;

import com.w6w.corns.domain.loginlog.LoginLog;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class LoginLogSaveDto {

    private int loginLogSq;
    private int userId;

    public LoginLog toEntity(){
        return LoginLog.builder()
                .userId(userId)
                .build();
    }
}
