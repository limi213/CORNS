package com.w6w.corns.domain.selfevaluation;

import lombok.*;

import java.io.Serializable;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@ToString
public class SelfEvaluationPK implements Serializable {

    private int roomNo;

    private int userId;

}
