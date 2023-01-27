package com.w6w.corns.domain.roombookmark;

import com.w6w.corns.util.BaseTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
@IdClass(RoomBookmarkPK.class)
public class RoomBookmark extends BaseTime {

    @Id
    private int roomNo;

    @Id
    private int userId;

}
