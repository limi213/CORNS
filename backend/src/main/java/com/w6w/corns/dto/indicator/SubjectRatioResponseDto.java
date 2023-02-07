package com.w6w.corns.dto.indicator;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class SubjectRatioResponseDto {

    private int subjectNo;

    private String value;

    private int cnt;
}
