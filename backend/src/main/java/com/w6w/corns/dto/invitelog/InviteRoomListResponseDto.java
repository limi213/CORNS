package com.w6w.corns.dto.invitelog;

import com.w6w.corns.dto.room.response.RoomResponseDto;
import com.w6w.corns.dto.subject.SubjectResponseDto;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알룸 초대 리스트 응답 정보")
public class InviteRoomListResponseDto {
    InviteUserDto inviteUser;
    InviteRoomDto inviteRoom;

    public InviteRoomListResponseDto(int userId, String nickname, String imgUrl,
                                     int roomNo, String title, int time, int maxMember, int subjectNo) {
        this.inviteUser = new InviteUserDto(userId, nickname, imgUrl);
        this.inviteRoom = new InviteRoomDto(roomNo, title, time, maxMember, subjectNo, null);
    }
}
