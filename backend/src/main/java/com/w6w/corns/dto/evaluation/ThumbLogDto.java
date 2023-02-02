package com.w6w.corns.dto.evaluation;

import com.w6w.corns.domain.thumblog.ThumbLog;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class ThumbLogDto {
    private int roomNo;
    private int fromUserId;
    private int toUserId;

    public ThumbLog toEntity() {
        return ThumbLog.builder()
                .roomNo(roomNo)
                .fromUserId(fromUserId)
                .toUserId(toUserId)
                .build();
    }
}
