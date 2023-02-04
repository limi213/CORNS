package com.w6w.corns.dto.room.response;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알룸 유저 응답 정보")
public class RoomUserResponseDto {

    private String connectionId;

    private String recordId;

    private String token;

}
