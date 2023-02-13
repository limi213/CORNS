package com.w6w.corns.domain.invitelog;

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
public class InviteLog extends BaseTime {

    @Id
    private int inviteLogSq;

    private int fromUserId;

    private int toUserId;

    private int roomNo;

    @Builder
    public InviteLog(int fromUserId, int toUserId, int roomNo) {
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.roomNo = roomNo;
    }

}