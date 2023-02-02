package com.w6w.corns.dto.user;

import com.w6w.corns.domain.user.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDetailResponseDto {

    private int userId;
    private String email;
    private String nickname;
    private String imgUrl;
    private long expTotal;
    private int level;
    private long friendTotal;
    private int social;
    private boolean isGoogle;
    private String refreshToken;
    private long attendTotal;
    private long conversationTotal;
    private long thumbTotal;
    private LocalDateTime lastLoginTm;

    public static UserDetailResponseDto fromEntity(User user){

        //attendTotal, friendTotal, conv, thumb, rank 가져오기
        return UserDetailResponseDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .imgUrl(user.getImgUrl())
                .level(user.getLevel().getLevelNo())
                .expTotal(user.getExpTotal())
                .social(user.getSocial())
                .refreshToken(user.getRefreshToken())
                .lastLoginTm(user.getLastLoginTm())
                .build();

    }
}
