package com.w6w.corns.dto.conversationlog;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class RoomLogFilterDto {
    Boolean isOnlyBookmark;
    List<Integer> subjects;
    int minTime;
    int maxTime;
    String startDate;
    String endDate;
    List<Integer> selfScores;
    int getThumb;
}
