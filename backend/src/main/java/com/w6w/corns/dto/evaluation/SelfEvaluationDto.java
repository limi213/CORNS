package com.w6w.corns.dto.evaluation;

import com.w6w.corns.domain.selfevaluation.SelfEvaluation;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class SelfEvaluationDto {
    private int roomNo;
    private int userId;
    private int score;
    private String description;

    public SelfEvaluation toEntity() {
        return SelfEvaluation.builder()
                .roomNo(roomNo)
                .userId(userId)
                .score(score)
                .description(description)
                .build();
    }
}