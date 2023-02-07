package com.w6w.corns.dto.user;

import com.w6w.corns.domain.user.User;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="유저 회원가입 요청 정보")
public class UserJoinRequestDto {

    private String email;
    private String password;
    private String nickname;

    public User toEntity(){
        return User
                .builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .build();
    }
}
