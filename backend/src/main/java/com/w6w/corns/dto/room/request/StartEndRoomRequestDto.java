package com.w6w.corns.dto.room.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="대화 시작 요청 정보")
public class StartEndRoomRequestDto {

    private int roomNo;

}
