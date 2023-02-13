package com.w6w.corns.dto.invitelog;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class InviteRoomDto {
    private int roomNo;
    private String title;
    private int time;
    private int maxMember;
    private int subjectNo;
    private String subjectValue;
}
