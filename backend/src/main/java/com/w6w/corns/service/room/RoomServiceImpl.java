package com.w6w.corns.service.room;

import com.w6w.corns.domain.room.Room;
import com.w6w.corns.domain.room.RoomRepository;
import com.w6w.corns.domain.roomuser.RoomUser;
import com.w6w.corns.domain.roomuser.RoomUserRepository;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.room.request.CreateRoomRequestDto;
import com.w6w.corns.dto.room.request.EnterRoomRequestDto;
import com.w6w.corns.dto.room.request.StartEndRoomRequestDto;
import com.w6w.corns.dto.room.request.UpdateRoomRequestDto;
import com.w6w.corns.dto.room.response.*;
import com.w6w.corns.service.subject.SubjectService;
import com.w6w.corns.util.PageableResponseDto;
import com.w6w.corns.util.code.RoomCode;
import com.w6w.corns.util.code.RoomUserCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    private final RoomUserRepository roomUserRepository;

    private final SubjectService subjectService;

    private final UserRepository userRepository;

    //대화 참여자 리스트
    @Override
    public List<Integer> getUserList(int roomNo) {
        return roomUserRepository.findUserByRoomNo(roomNo);
    }

    // 방 생성
    @Override
    @Transactional
    public RoomAndRoomUserListResponseDto save(CreateRoomRequestDto body) {
        // check room user code
        if (!isNotUserInConversation(body.getUserId(), RoomUserCode.ROOM_USER_CONVERSATION.getCode())) return null;

        // save room - set hostUserId, roomCd
        Room room = body.getRoom().toEntity();
        room.setHostUserId(body.getUserId());
        room.setRoomCd(RoomCode.ROOM_WAITING.getCode());
        room.setCurrentMember(1);
        roomRepository.save(room);

        // save roomUser - set roomNo, userId, roomUserCd
        RoomUser roomUser = body.getRoomUser().toEntity();
        roomUser.setRoomNo(room.getRoomNo());
        roomUser.setUserId(body.getUserId());
        roomUser.setUserCd(RoomUserCode.ROOM_USER_WAITING.getCode());
        roomUserRepository.save(roomUser);

        return findRoomAndRoomUserByRoomNo(room.getRoomNo(), RoomUserCode.ROOM_USER_WAITING.getCode());
    }

    // 쫑알룸 목록 (페이징)
    @Override
    public PageableResponseDto searchBySlice(String baseTime, ArrayList<Integer> subjects, int minTime, int maxTime, boolean isAvail, Pageable pageable) {
        Slice<Room> slice = roomRepository.searchBySlice(baseTime, subjects, minTime, maxTime, isAvail, pageable);
        List<RoomListResponseDto> roomList = slice.stream()
                .map(m -> RoomListResponseDto.builder()
                        // room
                        .room(RoomResponseDto.builder()
                                .roomNo(m.getRoomNo())
                                .title(m.getTitle())
                                .time(m.getTime())
                                .currentMember(m.getCurrentMember())
                                .maxMember(m.getMaxMember())
                                .roomCd(m.getRoomCd())
                                .sessionId(m.getSessionId())
                                .build())
                        // subject - select by subject no
                        .subject(subjectService.findById(m.getSubjectNo()))
                        .build())
                .collect(Collectors.toList());
        return new PageableResponseDto(slice.hasNext(), roomList);
    }

    // 방 상세 정보
    @Override
    @Transactional(readOnly = true)
    public RoomListResponseDto findRoomByRoomNo(int roomNo) {
        Optional<Room> result = roomRepository.findById(roomNo);
        if (result.isEmpty()) return null;

        Room room = result.get();
        return RoomListResponseDto.builder()
                .room(RoomResponseDto.builder()
                        .roomNo(room.getRoomNo())
                        .title(room.getTitle())
                        .time(room.getTime())
                        .currentMember(room.getCurrentMember())
                        .maxMember(room.getMaxMember())
                        .hostUserId(room.getHostUserId())
                        .sessionId(room.getSessionId())
                        .build())
                .subject(subjectService.findById(room.getSubjectNo()))
                .build();
    }

    // 대화방 내 유저 목록
    @Override
    @Transactional(readOnly = true)
    public List<RoomUserListResponseDto> findRoomUserByRoomNoAndRoomUserCode(int roomNo, int roomUserCd) {
        List<RoomUser> roomUsers = roomUserRepository.findRoomUserInRoom(roomNo, roomUserCd);
        if (roomUsers.isEmpty()) return null;

        return roomUsers.stream()
                .map(m -> RoomUserListResponseDto.builder()
                        .roomUser(RoomUserResponseDto.builder()
                                .connectionId(m.getConnectionId())
                                .recordId(m.getRecordId())
                                .token(m.getToken())
                                .build())
                        .user(userRepository.findById(m.getUserId()).get()
                                .toUserResponseBuilder())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public RoomAndRoomUserListResponseDto findRoomAndRoomUserByRoomNo(int roomNo, int roomUserCd) {
        return RoomAndRoomUserListResponseDto.builder()
                .room(findRoomByRoomNo(roomNo))
                .roomUser(findRoomUserByRoomNoAndRoomUserCode(roomNo, roomUserCd))
                .build();
    }

    // 유저가 대화중인지 체크
    @Override
    @Transactional(readOnly = true)
    public boolean isNotUserInConversation(int userId, int roomCd) {
        //// 유저가 대화 참여 가능하면 true 반환 - 6000(대기중), 6001(대기중)이 아닐 때
        if (roomUserRepository.findUserInRoom(userId, roomCd).isEmpty()) return true;
        return false;
    }

    // 쫑알룸 대화가 시작되었는지 체크
    @Transactional(readOnly = true)
    public boolean isNotStartRoomInConversation(int roomNo) {
        if (roomRepository.findById(roomNo).get().getRoomCd() == RoomCode.ROOM_WAITING.getCode()) return true;
        return false;
    }

    // 쫑알룸 정원 체크
    @Override
    @Transactional(readOnly = true)
    public int isAvailableEnterRoom(int roomNo) {
        Optional<Room> room = roomRepository.findById(roomNo);
        if (room.isEmpty()) // 방 폭파
            return 0;
        else if (room.get().getMaxMember() == room.get().getCurrentMember()) // 인원 마감
            return 1;
        else // 입장 가능
            return 2;
    }

    // 쫑알룸 입장 처리
    @Override
    @Transactional
    public RoomAndRoomUserListResponseDto enterRoom(EnterRoomRequestDto body) {
        // save roomUser - set roomNo, userId, roomUserCd
        RoomUser roomUser = body.getRoomUser().toEntity();
        roomUser.setRoomNo(body.getRoomNo());
        roomUser.setUserId(body.getUserId());
        roomUser.setUserCd(RoomUserCode.ROOM_USER_WAITING.getCode());
        roomUserRepository.save(roomUser);

        // current member + 1
        Room room = roomRepository.findById(body.getRoomNo()).get();
        room.setCurrentMember(room.getCurrentMember() + 1);
        roomRepository.save(room);

        return findRoomAndRoomUserByRoomNo(body.getRoomNo(), RoomUserCode.ROOM_USER_WAITING.getCode());
    }

    // 대화 시작
    @Override
    @Transactional
    public RoomAndRoomUserListResponseDto startConversation(StartEndRoomRequestDto body) {
        Room room = roomRepository.findById(body.getRoomNo()).get();
        List<RoomUser> roomUsers = roomUserRepository.findByRoomNo(body.getRoomNo());

        if (roomUsers.size() == 1) { // 혼자일 때 대화 시작 불가
            return null;
        } else {
            room.setRoomCd(RoomCode.ROOM_START.getCode());
            roomUsers.stream().forEach(user -> {
                user.setUserCd(RoomUserCode.ROOM_USER_CONVERSATION.getCode());
                user.setStartTmNow();
            });
            roomUserRepository.saveAll(roomUsers);
            return findRoomAndRoomUserByRoomNo(body.getRoomNo(), RoomUserCode.ROOM_USER_CONVERSATION.getCode());
        }
    }

    // 쫑알룸 퇴장
    @Override
    @Transactional
    public RoomAndRoomUserListResponseDto exitRoom(UpdateRoomRequestDto body) {
        Room room = roomRepository.findById(body.getRoomNo()).get();

        if (room.getRoomCd() == RoomCode.ROOM_WAITING.getCode()) { // 대기방일 때
            // room_user table 에서 삭제
            roomUserRepository.deleteByUserIdAndRoomNo(body.getUserId(), body.getRoomNo());
            room.setCurrentMember(room.getCurrentMember() - 1);

            // 대화방에 아무도 남아있지 않을 때 room table 에서 삭제
            if (room.getCurrentMember() == 0) {
                roomRepository.deleteById(body.getRoomNo());
                return null;
            }
            // 방장일 때 방장 교체
            else if (room.getHostUserId() == body.getUserId()) {
                Integer userId = roomUserRepository.findByRoomNo(body.getRoomNo()).get(0).getUserId();
                room.setHostUserId(userId);
                roomRepository.save(room);
            }

            return findRoomAndRoomUserByRoomNo(body.getRoomNo(), RoomUserCode.ROOM_USER_WAITING.getCode());

        } else if (room.getRoomCd() == RoomCode.ROOM_START.getCode()) { // 대화 중일 때
            RoomUser roomUser = roomUserRepository.findByUserIdAndRoomNo(body.getUserId(), body.getRoomNo());
            roomUser.setUserCd(RoomUserCode.ROOM_USER_EXIT.getCode());
            roomUserRepository.save(roomUser);

            room.setCurrentMember(room.getCurrentMember() - 1);

            // 대화방에 혼자 있을 때 대화 종료
            if (room.getCurrentMember() == 1) {
                room.setRoomCd(RoomCode.ROOM_END.getCode());

                RoomUser remainUser = roomUserRepository.findRoomUserInRoom(body.getRoomNo(), RoomUserCode.ROOM_USER_CONVERSATION.getCode()).get(0);
                remainUser.setUserCd(RoomUserCode.ROOM_USER_END.getCode());
                roomUserRepository.save(remainUser);
            }

            roomRepository.save(room);

            return findRoomAndRoomUserByRoomNo(body.getRoomNo(), RoomUserCode.ROOM_USER_END.getCode());
        } else {
            return RoomAndRoomUserListResponseDto.builder()
                    .room(RoomListResponseDto.builder()
                            .room(RoomResponseDto.builder()
                                    .roomCd(RoomCode.ROOM_END.getCode())
                                    .build())
                            .build())
                    .build();
        }
    }

    // 대화 종료
    @Override
    @Transactional
    public RoomAndRoomUserListResponseDto endConversation(StartEndRoomRequestDto body) {
        Room room = roomRepository.findById(body.getRoomNo()).get();
        room.setRoomCd(RoomCode.ROOM_END.getCode());
        roomRepository.save(room);

        List<RoomUser> roomUsers = roomUserRepository.findByRoomNoAndRoomUserCd(body.getRoomNo(), RoomUserCode.ROOM_USER_END.getCode());
        roomUsers.stream().forEach(user -> user.setUserCd(RoomUserCode.ROOM_USER_END.getCode()));
        roomUserRepository.saveAll(roomUsers);

        return findRoomAndRoomUserByRoomNo(body.getRoomNo(), RoomUserCode.ROOM_USER_END.getCode());
    }

}
