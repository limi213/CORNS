package com.w6w.corns.dto.room.response;

import com.w6w.corns.domain.room.Room;
import com.w6w.corns.dto.subject.SubjectResponseDto;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@ToString
@ApiModel(value="쫑알룸 리스트 응답 정보")
public class RoomListResponseDto {

    RoomResponseDto room;

    SubjectResponseDto subject;

    @Builder
    public RoomListResponseDto(RoomResponseDto room, SubjectResponseDto subject) {
        this.room = room;
        this.subject = subject;
    }

}
