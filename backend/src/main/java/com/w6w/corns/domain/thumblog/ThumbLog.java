package com.w6w.corns.domain.thumblog;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class ThumbLog extends BaseTime {

    @Id
    private int thumbLogSq;

    private int roomNo;

    private int fromUserId;

    private int toUserId;

    @Builder
    public ThumbLog(int roomNo, int fromUserId, int toUserId) {
        this.roomNo = roomNo;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
    }

}