package com.w6w.corns.dto.rank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class UserRankResponseDto {

    private int ranking;

    private int rankCd;

    private int value;
}
