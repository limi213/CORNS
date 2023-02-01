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
import com.w6w.corns.dto.room.response.RoomListResponseDto;
import com.w6w.corns.dto.room.response.RoomResponseDto;
import com.w6w.corns.dto.room.response.RoomUserListResponseDto;
import com.w6w.corns.dto.room.response.RoomUserResponseDto;
import com.w6w.corns.service.subject.SubjectService;
import com.w6w.corns.util.code.RoomCode;
import com.w6w.corns.util.code.RoomUserCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    private final RoomUserRepository roomUserRepository;

    private final SubjectService subjectService;

    private final UserRepository userRepository;

    // 방 생성
    @Override
    @Transactional
    public int save(CreateRoomRequestDto body) {
        // check room user code
        if (!isNotUserInConversation(body.getUserId())) return -1;

        // save room - set hostUserId, roomCd
        Room room = body.getRoom().toEntity();
        room.setHostUserId(body.getUserId());
        room.setRoomCd(RoomCode.ROOM_WAITING.getCode());
        roomRepository.save(room);

        // save roomUser - set roomNo, userId, roomUserCd
        RoomUser roomUser = body.getRoomUser().toEntity();
        roomUser.setRoomNo(room.getRoomNo());
        roomUser.setUserId(body.getUserId());
        roomUser.setUserCd(RoomUserCode.ROOM_USER_WAITING.getCode());
        roomUserRepository.save(roomUser);

        return 1;
    }

    // 전체 리스트 - 페이징 필요함
    @Override
    @Transactional(readOnly = true)
    public List<RoomListResponseDto> findAll() {
        return roomRepository.findAllByRoomCd(RoomCode.ROOM_START.getCode()).stream()
                .map(m -> RoomListResponseDto.builder()
                        // room
                        .room(RoomResponseDto.builder()
                                .roomNo(m.getRoomNo())
                                .title(m.getTitle())
                                .time(m.getTime())
                                .maxMember(m.getMaxMember())
                                .roomCd(m.getRoomCd())
                                .sessionId(m.getSessionId())
                                .build())
                        // subject - select by subject no
                        .subject(subjectService.findById(m.getSubjectNo()))
                        .build())
                .collect(Collectors.toList());
    }

    // 방 상세 정보
    @Override
    @Transactional(readOnly = true)
    public RoomResponseDto findRoomByRoomNo(int roomNo) {
        Optional<Room> result = roomRepository.findById(roomNo);
        if (result.isEmpty()) return null;

        Room room = result.get();
        return RoomResponseDto.builder()
                .roomNo(room.getRoomNo())
                .title(room.getTitle())
                .time(room.getTime())
                .maxMember(room.getMaxMember())
                .hostUserId(room.getHostUserId())
                .sessionId(room.getSessionId())
                .build();
    }

    // 대화방 내 유저 목록
    @Override
    @Transactional(readOnly = true)
    public List<RoomUserListResponseDto> findRoomUserByRoomNo(int roomNo) {
        List<RoomUser> roomUsers = roomUserRepository.findByRoomNo(roomNo);
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

    // 유저가 대화중인지 체크
    @Override
    @Transactional(readOnly = true)
    public boolean isNotUserInConversation(int userId) {
        //// 유저가 대화 참여 가능하면 true 반환 - 6000(대기중), 6001(대기중)이 아닐 때
        if (roomUserRepository.findByUserIdAndRoomUserCd(userId).isEmpty()) return true;
        return false;
    }

    // 쫑알룸 정원 체크
    @Override
    @Transactional(readOnly = true)
    public int isAvailableEnterRoom(int roomNo) {
        Optional<Room> room = roomRepository.findById(roomNo);
        if (room.isEmpty()) // 방 폭파
            return 0;
        else if (room.get().getMaxMember() == roomUserRepository.findByRoomNo(roomNo).size()) // 인원 마감
            return 1;
        else // 입장 가능
            return 2;
    }

    // 쫑알룸 입장 처리
    @Override
    @Transactional
    public List<RoomUserListResponseDto> enterRoom(EnterRoomRequestDto body) {
        // save roomUser - set roomNo, userId, roomUserCd
        RoomUser roomUser = body.getRoomUser().toEntity();
        roomUser.setRoomNo(body.getRoomNo());
        roomUser.setUserId(body.getUserId());
        roomUser.setUserCd(RoomUserCode.ROOM_USER_WAITING.getCode());
        roomUserRepository.save(roomUser);

        return findRoomUserByRoomNo(body.getRoomNo());
    }

    // 대화 시작
    @Override
    @Transactional
    public int startConversation(StartEndRoomRequestDto body) {
        Room room = roomRepository.findById(body.getRoomNo()).get();
        List<RoomUser> roomUsers = roomUserRepository.findByRoomNo(body.getRoomNo());

        if (roomUsers.size() == 1) { // 혼자일 때 대화 시작 불가
            return 0;
        } else {
            room.setRoomCd(RoomCode.ROOM_START.getCode());
            roomUsers.stream().forEach(user -> user.setUserCd(RoomUserCode.ROOM_USER_CONVERSATION.getCode()));
            roomUserRepository.saveAll(roomUsers);
            return 1;
        }
    }

    // 쫑알룸 퇴장
    @Override
    @Transactional
    public void exitRoom(UpdateRoomRequestDto body) {
        Room room = roomRepository.findById(body.getRoomNo()).get();

        if (room.getRoomCd() == RoomCode.ROOM_WAITING.getCode()) { // 대기방일 때
            // room_user table 에서 삭제
            roomUserRepository.deleteByUserIdAndRoomNo(body.getUserId(), body.getRoomNo());
            // 대기방에 아무도 남아있지 않을 때 room table 에서 삭제
            if (roomUserRepository.findByRoomNo(body.getRoomNo()).isEmpty()) {
                roomRepository.deleteById(body.getRoomNo());
            }
            // 방장일 때 방장 교체
            else if (roomRepository.findById(body.getRoomNo()).get().getHostUserId() == body.getUserId()) {
                int userId = roomUserRepository.findByRoomNo(body.getRoomNo()).stream().findFirst().get().getUserId();
                room.setHostUserId(userId);
                roomRepository.save(room);
            }
        } else if (room.getRoomCd() == RoomCode.ROOM_START.getCode()) { // 대화 중일 때
            RoomUser roomUser = roomUserRepository.findByUserIdAndRoomNo(body.getUserId(), body.getRoomNo());
            roomUser.setUserCd(RoomUserCode.ROOM_USER_EXIT.getCode());
            roomUserRepository.save(roomUser);
        }
    }

    // 대화 종료
    @Override
    @Transactional
    public void endConversation(StartEndRoomRequestDto body) {
        Room room = roomRepository.findById(body.getRoomNo()).get();
        room.setRoomCd(RoomCode.ROOM_END.getCode());
        roomRepository.save(room);

        List<RoomUser> roomUsers = roomUserRepository.findByRoomNoAndRoomUserCd(body.getRoomNo(), RoomUserCode.ROOM_USER_CONVERSATION.getCode());
        roomUsers.stream().forEach(user -> user.setUserCd(RoomUserCode.ROOM_USER_END.getCode()));
        roomUserRepository.saveAll(roomUsers);
    }

}
