package com.w6w.corns.service.room;


import com.w6w.corns.domain.room.Room;
import com.w6w.corns.dto.room.request.CreateRoomRequestDto;
import com.w6w.corns.dto.room.request.EnterRoomRequestDto;
import com.w6w.corns.dto.room.request.StartEndRoomRequestDto;
import com.w6w.corns.dto.room.request.UpdateRoomRequestDto;
import com.w6w.corns.dto.room.response.RoomAndRoomUserListResponseDto;
import com.w6w.corns.dto.room.response.RoomListResponseDto;
import com.w6w.corns.dto.room.response.RoomResponseDto;
import com.w6w.corns.dto.room.response.RoomUserListResponseDto;
import com.w6w.corns.util.PageableResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.ArrayList;
import java.util.List;

public interface RoomService {

    // 대화 참여자 리스트
    List<Integer> getUserList(int roomNo);
    // 방 생성
    public RoomAndRoomUserListResponseDto save(CreateRoomRequestDto body);
    // 필터링
    public PageableResponseDto searchBySlice(String baseTime, ArrayList<Integer> subjects, int minTime, int maxTime, boolean isAvail, Pageable pageable);
    // 방 상세 정보
    public RoomListResponseDto findRoomByRoomNo(int roomNo);
    // 대화방 내 유저 목록
    public List<RoomUserListResponseDto> findRoomUserByRoomNoAndRoomUserCode(int roomNo, int roomUserCd);
    // 방 정보 + 유저 목록
    public RoomAndRoomUserListResponseDto findRoomAndRoomUserByRoomNo(int roomNo, int roomUserCd);
    // 유저가 대화중인지 체크
    public boolean isNotUserInConversation(int userId, int roomUserCd);
    // 쫑알룸 대화가 시작되었는지 체크
    public boolean isNotStartRoomInConversation(int roomNo);
    // 쫑알룸 정원 체크
    public int isAvailableEnterRoom(int roomNo);
    // 쫑알룸 입장 처리
    public RoomAndRoomUserListResponseDto enterRoom(EnterRoomRequestDto body);
    // 대화 시작
    public RoomAndRoomUserListResponseDto startConversation(StartEndRoomRequestDto body);
    // 쫑알룸 퇴장
    public RoomAndRoomUserListResponseDto exitRoom(UpdateRoomRequestDto body);
    // 대화 종료
    public RoomAndRoomUserListResponseDto endConversation(StartEndRoomRequestDto body);
    // 유저가 대화중인 방 정보 반환
    public List<RoomListResponseDto> findRoomByUserId(int userId);

}
