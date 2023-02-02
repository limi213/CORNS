package com.w6w.corns.domain.user;

import com.w6w.corns.domain.level.Level;
import com.w6w.corns.dto.user.UserResponseDto;
import com.w6w.corns.util.BaseTime;
import com.w6w.corns.util.LocalDateTimeConverter;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
@Entity
public class User extends BaseTime {

    @Id
    private int userId;

    @Column(name="nickname", length = 20)
    private String nickname;

    @Column(length = 100)
    private String email;

    @Column(length = 1000)
    private String password;

    @Column(length=500)
    private String salt;

    @Column(length = 1000)
    private String imgUrl;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    private int expTotal;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level_no")
    private Level level;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    private int friendTotal;

    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime lastLoginTm;

    @Column(columnDefinition = "TINYINT", nullable = false)
    private int social;

    @Column(length = 1000)
    private String refreshToken;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    private int userCd;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    private int reportTotal;

    @Convert(converter = LocalDateTimeConverter.class)
    public void setLastLoginTm(){
        lastLoginTm=LocalDateTime.now();
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
