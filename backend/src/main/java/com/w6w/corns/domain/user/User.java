package com.w6w.corns.domain.user;

import com.w6w.corns.domain.level.Level;
import com.w6w.corns.dto.user.UserResponseDto;
import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.DynamicUpdate;

@DynamicInsert
@DynamicUpdate
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
@Entity
public class User extends BaseTime {

    @Id
    private int userId;

    private String nickname;

    private String email;

    private String password;

    private String salt;

    private String imgUrl;

    @Column(insertable = false)
    private int expTotal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level_no")
    private Level level;

    @Column(insertable = false)
    private int friendTotal;

    @Column(insertable = false)
    private int attendTotal;

    @Column(insertable = false)
    private int speakingTotal;

    @Column(insertable = false)
    private int thumbTotal;

    @Column(insertable = false)
    private LocalDateTime lastLoginTm;

    private int social;

    private String refreshToken;

    @Column(insertable = false)
    private int userCd;

    @Column(insertable = false)
    private int reportTotal;

    public void setEmail(String email){ this.email = email; }
    public void setLastLoginTm(LocalDateTime lastLoginTm){
        this.lastLoginTm = lastLoginTm;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setNickname(String nickname){
        this.nickname = nickname;
    }
    public void setSalt(String salt){
        this.salt = salt;
    }
    public void setImgUrl(String imgUrl){
        this.imgUrl = imgUrl;
    }
    public void setRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }
    public void setSocial(int social){
        this.social = social;
    }
    public void setUserCd(int userCd){
        this.userCd = userCd;
    }
   public void setExpTotal(int expTotal){
        this.expTotal = expTotal;
   }
   public void setFriendTotal(int friendTotal){
        this.friendTotal = friendTotal;
   }
   public void setAttendTotal(int attendTotal){
        this.attendTotal = attendTotal;
   }
   public void setSpeakingTotal(int speakingTotal){
        this.speakingTotal = speakingTotal;
   }
   public void setThumbTotal(int thumbTotal){
        this.thumbTotal = thumbTotal;
   }
   public void setReportTotal(int reportTotal){
        this.reportTotal = reportTotal;
   }

    @Builder(builderClassName = "UserRegister", builderMethodName = "userRegister")
    public User(String email, String password, String salt, String nickname, int social) {
        this.email = email;
        this.password=password;
        this.salt=salt;
        this.nickname=nickname;
        this.social = social;
    }

    public UserResponseDto toUserResponseBuilder() {
        return UserResponseDto.builder()
                .userId(userId)
                .imgUrl(imgUrl)
                .nickname(nickname)
                .build();
    }
}
