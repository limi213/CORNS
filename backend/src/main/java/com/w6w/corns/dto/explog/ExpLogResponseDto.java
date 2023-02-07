package com.w6w.corns.dto.explog;

import com.w6w.corns.domain.explog.ExpLog;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class ExpLogResponseDto {

    private int expLogSq;

    private int userId;

    private int gainExp;

    private int expCd;

    public static ExpLogResponseDto fromEntity(ExpLog expLog){
        return ExpLogResponseDto.builder()
                .expLogSq(expLog.getExpLogSq())
                .userId(expLog.getUserId())
                .gainExp(expLog.getGainExp())
                .expCd(expLog.getExpCd())
                .build();
    }
}
