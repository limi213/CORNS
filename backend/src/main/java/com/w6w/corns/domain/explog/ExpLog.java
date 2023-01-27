package com.w6w.corns.domain.explog;

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
public class ExpLog extends BaseTime {

    @Id
    private int expLogSq;

    private int userId;

    private int gainExp;

    private int expCd;
}
