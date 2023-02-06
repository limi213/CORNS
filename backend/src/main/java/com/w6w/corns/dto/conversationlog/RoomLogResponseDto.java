package com.w6w.corns.dto.conversationlog;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class RoomLogResponseDto {
    private int roomNo;
    private Boolean isBookmark;
    private int subject;
    private String title;
    private String startTime;
    private int time;
    private int member;
    private int selfScore;
    private String selfDesc;
    private int thumbCnt;
    private Boolean canRead;
}
