package com.w6w.corns.dto.room.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="방 나가기 요청 정보")
public class UpdateRoomRequestDto {

    private int roomNo;

    private int userId;

}
