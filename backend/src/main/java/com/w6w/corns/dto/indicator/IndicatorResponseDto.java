package com.w6w.corns.dto.indicator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class IndicatorResponseDto {

    private String x;

    private String y;
}
