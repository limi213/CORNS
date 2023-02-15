package com.w6w.corns.domain.cal;

import com.w6w.corns.util.BaseTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class CalLog extends BaseTime {

    @Id
    private int calLogSq;

    private int userId;

    private int rankCd;

    private int value;

    private LocalDate startDt;

    private LocalDate endDt;
}
