package com.w6w.corns.dto.user;

import com.w6w.corns.domain.user.User;
import com.w6w.corns.dto.rank.UserRankResponseDto;
import io.swagger.annotations.ApiModel;
import java.util.List;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@ApiModel(value="유저 상세 응답 정보")
public class UserDetailResponseDto {

    private int userId;
    private String email;
    private String nickname;
    private String imgUrl;
    private long expTotal;
    private int levelNo;
    private long friendTotal;
    private int social;
    private boolean isGoogle;
    private long attendTotal;
    private long speakingTotal;
    private long thumbTotal;
    private List<UserRankResponseDto> rank;

    public static UserDetailResponseDto fromEntity(User user){

        //attendTotal, friendTotal, conv, thumb, rank 가져오기
        return UserDetailResponseDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .imgUrl(user.getImgUrl())
                .levelNo(user.getLevel().getLevelNo())
                .expTotal(user.getExpTotal())
                .attendTotal(user.getAttendTotal())
                .speakingTotal(user.getSpeakingTotal())
                .thumbTotal(user.getThumbTotal())
                .friendTotal(user.getFriendTotal())
                .social(user.getSocial())
                .build();

    }
}
