package com.w6w.corns.dto.room.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알룸 생성 요청 정보")
public class CreateRoomRequestDto {

    private int userId;

    private RoomRequestDto room;

    private RoomUserRequestDto roomUser;

}
