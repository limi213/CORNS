package com.w6w.corns.dto.user;

import com.w6w.corns.domain.user.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserLoginRequestDto {

    private String email;
    private String password;

    public User toEntity(){
        return User
                .builder()
                .email(email)
                .password(password)
                .build();
    }
}
