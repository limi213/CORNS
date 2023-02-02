package com.w6w.corns.dto.room.request;

import com.w6w.corns.domain.roomuser.RoomUser;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알룸 유저 요청 정보")
public class RoomUserRequestDto {

    @ApiModelProperty(value = "OpenVidu connection id")
    private String connectionId;

    @ApiModelProperty(value = "OpenVidu record id")
    private String recordId;

    @ApiModelProperty(value = "OpenVidu token")
    private String token;

    public RoomUser toEntity() {
        return RoomUser.builder()
                .connectionId(connectionId)
                .recordId(recordId)
                .token(token)
                .build();
    }
}
