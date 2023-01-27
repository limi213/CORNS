package com.w6w.corns.domain.selfevaluation;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class SelfEvaluationPK implements Serializable {

    private int roomNo;

    private int userId;

}
