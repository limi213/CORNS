package com.w6w.corns.dto.room.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알룸 입장 요청 정보")
public class EnterRoomRequestDto {

    private int roomNo;

    private int userId;

    private RoomUserRequestDto roomUser;

}
