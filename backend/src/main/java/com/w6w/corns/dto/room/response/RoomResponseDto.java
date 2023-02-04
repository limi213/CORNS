package com.w6w.corns.dto.room.response;

import com.w6w.corns.domain.room.Room;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알룸 응답 정보")
public class RoomResponseDto {

    private int roomNo;

    private String title;

    private int time;

    private int currentMember;

    private int maxMember;

    private int hostUserId;

    private int roomCd;

    private String sessionId;

}
