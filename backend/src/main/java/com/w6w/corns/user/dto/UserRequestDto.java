package com.w6w.corns.user.dto;

import com.w6w.corns.user.domain.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="UserRequestDto : 회원요청정보")
public class UserRequestDto {

    @ApiModelProperty(value = "회원 고유번호")
    private int userId;

    @ApiModelProperty(value = "회원 이메일")
    private String email;

    @ApiModelProperty(value = "회원 비밀번호")
    private String password;

    @ApiModelProperty(value = "salt")
    private String salt;

    @ApiModelProperty(value = "회원 닉네임")
    private String nickname;
    
    @ApiModelProperty(value = "회원 프로필 이미지")
    private String imgUrl;

    @ApiModelProperty(value = "로그인정보")
    private int social;
    
    @ApiModelProperty(value = "토큰")
    private String refreshToken;

    public User toEntity(){
        return User.builder()
                .userId(userId)
                .email(email)
                .password(password)
                .salt(salt)
                .nickname(nickname)
                .imgUrl(imgUrl)
                .social(social)
                .refreshToken(refreshToken)
                .build();
    }
}
