package com.w6w.corns.domain.user;

import com.w6w.corns.domain.level.Level;
import com.w6w.corns.util.BaseTime;
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

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime lastLoginTm;

    @Column(columnDefinition = "TINYINT", nullable = false)
    private int social;

    @Column(length = 1000)
    private String refreshToken;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    private int userCd;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    private int reportTotal;

    @Builder(builderClassName = "UserRegister", builderMethodName = "userRegister")
    public User(String email, String password, String salt, String nickname, int social) {
        this.email = email;
        this.password=password;
        this.salt=salt;
        this.nickname=nickname;
        this.social = social;
    }

    public User update(String email, String imgUrl, int social){
        this.email=email;
        this.imgUrl=imgUrl;
        this.social=social;
        return this;
    }

    public void updateLastLoginTM(){
        this.lastLoginTm=LocalDateTime.now();
    }

}
