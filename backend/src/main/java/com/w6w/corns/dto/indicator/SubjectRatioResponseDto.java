package com.w6w.corns.dto.indicator;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class SubjectRatioResponseDto {

    private String id;

    private String label;

    private int value;
}
