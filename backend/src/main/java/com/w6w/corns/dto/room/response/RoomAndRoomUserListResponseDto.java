package com.w6w.corns.dto.room.response;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알룸 & 유저 리스트 응답 정보")
public class RoomAndRoomUserListResponseDto {

    private RoomListResponseDto room;

    private List<RoomUserListResponseDto> roomUser;

}
