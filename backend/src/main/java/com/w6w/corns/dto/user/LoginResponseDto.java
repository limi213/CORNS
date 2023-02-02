package com.w6w.corns.dto.user;

import com.mysql.cj.log.Log;
import com.w6w.corns.domain.user.User;
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

    public static LoginResponseDto fromEntity(User user){

        //attendTotal, friendTotal, conv, ddabong, rank 가져오기
        return LoginResponseDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .imgUrl(user.getImgUrl())
                .level(user.getLevel().getLevelNo())
                .expTotal(user.getExpTotal())
                .social(user.getSocial())
                .refreshToken(user.getRefreshToken())
                .build();

    }
}
