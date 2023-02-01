package com.w6w.corns.domain.roomuser;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class RoomUser extends BaseTime {

    @Id
    private int roomUserNo;

    private int roomNo;

    private int userId;

    private int roomUserCd;

    private String connectionId;

    private String recordId;

    private String token;

    private String scriptUrl;

    @Builder
    public RoomUser(String connectionId, String recordId, String token) {
        this.connectionId = connectionId;
        this.recordId = recordId;
        this.token = token;
    }

    public void setRoomNo(int roomNo) {
        this.roomNo = roomNo;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setUserCd(int roomUserCd) {
        this.roomUserCd = roomUserCd;
    }

    public void setScriptUrl(String scriptUrl) {
        this.scriptUrl = scriptUrl;
    }

}
