package com.w6w.corns.dto.explog;

import com.w6w.corns.domain.explog.ExpLog;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class ExpLogResponseDto {

    private int gainExp;

    private int expCd;

    private String regTm;

    public static ExpLogResponseDto fromEntity(ExpLog expLog){
        return ExpLogResponseDto.builder()
                .gainExp(expLog.getGainExp())
                .expCd(expLog.getExpCd())
                .regTm(expLog.getRegTm().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }
}
