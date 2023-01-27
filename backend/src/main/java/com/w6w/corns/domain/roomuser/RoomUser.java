package com.w6w.corns.domain.roomuser;

import com.w6w.corns.util.BaseTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
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

}
