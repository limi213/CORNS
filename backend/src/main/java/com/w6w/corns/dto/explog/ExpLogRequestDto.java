package com.w6w.corns.dto.explog;
import com.w6w.corns.domain.explog.ExpLog;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ExpLogRequestDto {

    private int userId;

    private int gainExp;

    private int expCd;

    public ExpLog toEntity(){
        return ExpLog.builder()
                .userId(userId)
                .gainExp(gainExp)
                .expCd(expCd)
                .build();
    }
}
