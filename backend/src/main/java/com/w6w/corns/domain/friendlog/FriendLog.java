package com.w6w.corns.domain.friendlog;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class FriendLog extends BaseTime {

    @Id
    private int friendLogSq;

    private int fromUserId;

    private int toUserId;

    private int friendLogCd;

    @Builder
    public FriendLog(int fromUserId, int toUserId, int friendLogCd) {
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.friendLogCd = friendLogCd;
    }

}