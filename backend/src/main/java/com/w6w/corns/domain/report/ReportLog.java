package com.w6w.corns.domain.report;

import com.w6w.corns.util.BaseTime;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class ReportLog extends BaseTime {

    @Id
    private int reportLogSq;

    private int fromUserId;

    private int toUserId;

    @ManyToOne
    @JoinColumn(name = "report_no")
    private Report report;

    private String description;

}
