package com.w6w.corns.domain.room;

import com.w6w.corns.domain.subject.Subject;
import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Room extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomNo;

    private String title;

    private int time;

    private int maxMember;

    private int currentMember;

    private int subjectNo;

    private int hostUserId;

    private int roomCd;

    private String sessionId;

    private String scriptUrl;

    @Builder
    public Room(String title, int time, int maxMember, int subjectNo, String sessionId) {
        this.title = title;
        this.time = time;
        this.maxMember = maxMember;
        this.subjectNo = subjectNo;
        this.sessionId = sessionId;
    }

    public void setCurrentMember(int currentMember) { this.currentMember = currentMember; }

    public void setHostUserId(int hostUserId) {
        this.hostUserId = hostUserId;
    }

    public void setRoomCd(int roomCd) {
        this.roomCd = roomCd;
    }

    public void setScriptUrl(String scriptUrl) {
        this.scriptUrl = scriptUrl;
    }

}
