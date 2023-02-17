package com.w6w.corns.domain.rank;

import com.w6w.corns.util.BaseTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Rank extends BaseTime {

    @Id
    private int rankNo;

    private int userId;

    private int ranking;

    private int rankCd;

    private int value;
}
