package com.w6w.corns.dto.level;

import com.w6w.corns.domain.level.Level;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class LevelDto {

    int levelNo;

    int startExp;

    int endExp;

    public static LevelDto fromEntity(Level level){
        return LevelDto.builder()
                .levelNo(level.getLevelNo())
                .startExp(level.getStartExp())
                .endExp(level.getEndExp())
                .build();
    }
}
