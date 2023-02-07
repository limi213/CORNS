package com.w6w.corns.domain.selfevaluation;

import com.w6w.corns.util.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
@IdClass(SelfEvaluationPK.class)
public class SelfEvaluation extends BaseTime {

    @Id
    private int roomNo;

    @Id
    private int userId;

    private int score;

    private String description;

    @Builder
    public SelfEvaluation(int roomNo, int userId, int score, String description) {
        this.roomNo = roomNo;
        this.userId = userId;
        this.score = score;
        this.description = description;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
