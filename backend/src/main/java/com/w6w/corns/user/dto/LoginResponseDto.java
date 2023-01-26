package com.w6w.corns.user.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginResponseDto {

    private int userId;
    private String email;
    private String nickname;
    private String imgUrl;
    private int expTotal;
    private int level;
    private int friendTotal;
    private int social;
    private String refreshToken;
    private int attendTotal;
    private int conversationTotal;
    private int ddabongTotal;

    @Builder
    public LoginResponseDto(int userId, String email, String nickname, String imgUrl, String refreshToken) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.imgUrl = imgUrl;
        this.refreshToken = refreshToken;
    }
}
