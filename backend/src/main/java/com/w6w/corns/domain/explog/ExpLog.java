package com.w6w.corns.domain.explog;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;

@DynamicInsert
@Getter
@Builder
@AllArgsConstructor
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
