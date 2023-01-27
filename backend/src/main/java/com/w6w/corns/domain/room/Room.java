package com.w6w.corns.domain.room;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Room extends BaseTime {

    @Id
    private int roomNo;

    private String title;

    private int time;

    private int maxMember;

    private int subjectNo;

    private int hostUserId;

    private int roomCd;

    private String sessionId;

    private String scriptUrl;

}
