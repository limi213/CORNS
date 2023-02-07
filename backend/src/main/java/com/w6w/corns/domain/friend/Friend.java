package com.w6w.corns.domain.friend;

import com.w6w.corns.domain.selfevaluation.SelfEvaluationPK;
import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
@IdClass(FriendPK.class)
public class Friend extends BaseTime {

    @Id
    @Column(name = "user_id_a")
    private int userIdA;

    @Id
    @Column(name = "user_id_b")
    private int userIdB;

    private int friendCd;

    private String message;

    public void setFriendCd(int friendCd) {
        this.friendCd = friendCd;
    }

    @Builder
    public Friend(int userIdA, int userIdB, int friendCd, String message) {
        this.userIdA = userIdA;
        this.userIdB = userIdB;
        this.friendCd = friendCd;
        this.message = message;
    }

}