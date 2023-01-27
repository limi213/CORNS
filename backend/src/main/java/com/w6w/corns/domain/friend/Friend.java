package com.w6w.corns.domain.friend;

import com.w6w.corns.domain.selfevaluation.SelfEvaluationPK;
import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

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
    private int userIdA;

    @Id
    private int userIdB;

    private int friendCd;

    @Builder
    public Friend(int userIdA, int userIdB, int friendCd) {
        this.userIdA = userIdA;
        this.userIdB = userIdB;
        this.friendCd = friendCd;
    }

}