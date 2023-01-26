package com.w6w.corns.user.domain;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@DynamicInsert
@DynamicUpdate
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
public class User extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int userId;

    @Column(name="nickname", length = 20)
    String nickname;

    @Column(length = 100)
    String email;

    @Column(length = 1000)
    String password;

    @Column(length=500)
    String salt;

    @Column(length = 1000)
    String imgUrl;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    int expTotal;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level_no")
    Level level;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    int friendTotal;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime lastLoginTm;

    @Column(columnDefinition = "TINYINT", nullable = false)
    int social;

    @Column(length = 1000)
    String refreshToken;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    int userCd;

    @Column(columnDefinition = "SMALLINT", insertable = false)
    int reportTotal;

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
