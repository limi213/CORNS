package com.w6w.corns.dto.room.request;

import com.w6w.corns.domain.room.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알룸 요청 정보")
public class RoomRequestDto {

    @ApiModelProperty(value = "쫑알룸 제목")
    private String title;

    @ApiModelProperty(value = "대화 시간")
    private int time;

    @ApiModelProperty(value = "최대 인원")
    private int maxMember;

    @ApiModelProperty(value = "주제 번호")
    private int subjectNo;

    @ApiModelProperty(value = "OpenVidu session id")
    private String sessionId;

    public Room toEntity() {
        return Room.builder()
                .title(title)
                .time(time)
                .maxMember(maxMember)
                .subjectNo(subjectNo)
                .sessionId(sessionId)
                .build();
    }

}
