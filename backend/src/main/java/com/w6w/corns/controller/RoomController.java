package com.w6w.corns.controller;

import com.w6w.corns.dto.room.request.CreateRoomRequestDto;
import com.w6w.corns.dto.room.request.EnterRoomRequestDto;
import com.w6w.corns.dto.room.request.StartEndRoomRequestDto;
import com.w6w.corns.dto.room.request.UpdateRoomRequestDto;
import com.w6w.corns.dto.room.response.RoomAndRoomUserListResponseDto;
import com.w6w.corns.dto.room.response.RoomListResponseDto;
import com.w6w.corns.dto.room.response.RoomUserListResponseDto;
import com.w6w.corns.service.room.RoomService;
import com.w6w.corns.util.PageableResponseDto;
import com.w6w.corns.util.code.RoomCode;
import com.w6w.corns.util.code.RoomUserCode;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("room")
public class RoomController {

    private final RoomService roomService;

    @ApiOperation(value = "쫑알룸 생성하기", notes = "방 정보와 OpenVidu 관련 정보를 body에 담아서 요청")
    @PostMapping
    private ResponseEntity<?> save(@RequestBody CreateRoomRequestDto body) {
        log.debug("request body: {}", body);
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            RoomAndRoomUserListResponseDto response = roomService.save(body);
            if (response != null) {
                status = HttpStatus.OK;
                return new ResponseEntity<RoomAndRoomUserListResponseDto>(response, status);
            }
            else {
                status = HttpStatus.CONFLICT;
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map>(resultMap, status);
    }

    @ApiOperation(value = "쫑알쫑알 목록 (페이징)", notes = "page, size, baseTime, subject, minTime, maxTime, showAvail 값을 쿼리 스트링으로 전달")
    @GetMapping
    private ResponseEntity<?> getAllRooms(@RequestParam String baseTime,
                                          @RequestParam String subject,
                                          @RequestParam int minTime,
                                          @RequestParam int maxTime,
                                          @RequestParam(defaultValue = "false") boolean isAvail,
                                          @PageableDefault Pageable pageable) {
        Map resultMap = new HashMap<>();
        HttpStatus status;
        log.debug("baseTime: {}, subject: {}, minTime: {}, maxTime: {}, isAvail: {}, pageable: {}", baseTime, subject, minTime, maxTime, isAvail, pageable);

        try {
            StringTokenizer st = new StringTokenizer(subject, " ");
            ArrayList<Integer> subjects = new ArrayList<>();
            while (st.hasMoreTokens()) subjects.add(Integer.parseInt(st.nextToken()));
            log.debug("subjects: {}", subjects);

            PageableResponseDto response = roomService.searchBySlice(baseTime, subjects, minTime, maxTime, isAvail, pageable);
            if (response.getList().isEmpty()) {
                status = HttpStatus.NO_CONTENT;
            } else {
                status = HttpStatus.OK;
                return new ResponseEntity<PageableResponseDto>(response, status);
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map>(resultMap, status);
    }

    @ApiOperation(value = "쫑알룸 정보 가져오기", notes = "쫑알룸 room_no를 path variable로 넘기면 쫑알룸 정보를 리턴")
    @GetMapping(value = "/{roomNo}")
    private ResponseEntity<?> getRoom(@PathVariable int roomNo) {
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            RoomListResponseDto room = roomService.findRoomByRoomNo(roomNo);
            log.debug("room: {}", room);
            if (room == null) {
                status = HttpStatus.NO_CONTENT;
            } else {
                resultMap.put("room", room);
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultMap, status);
    }

    @ApiOperation(value = "쫑알룸 유저 리스트", notes = "roomNo를 path variable로 넘기면 room user, user 테이블의 정보 반환")
    @GetMapping(value = "/{roomNo}/users")
    private ResponseEntity<?> getRoomUsers(@PathVariable int roomNo) {
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            List<RoomUserListResponseDto> roomUsers = roomService.findRoomUserByRoomNoAndRoomUserCode(roomNo, RoomUserCode.ROOM_USER_END.getCode());
            log.debug("roomUsers: {}", roomUsers);
            if (roomUsers == null) {
                status = HttpStatus.NO_CONTENT;
            } else {
                resultMap.put("room", roomUsers);
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultMap, status);
    }

    @ApiOperation(value = "쫑알룸 입장", notes = "")
    @PostMapping(value = "/user")
    private ResponseEntity<?> enterRoom(@RequestBody EnterRoomRequestDto body) {
        log.debug("body: {}", body);
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            if (!roomService.isNotUserInConversation(body.getUserId(), RoomUserCode.ROOM_USER_CONVERSATION.getCode())) {
                resultMap.put("message", "이미 대화중인 유저");
                status = HttpStatus.CONFLICT;
            } else if (!roomService.isNotStartRoomInConversation(body.getRoomNo())) {
                resultMap.put("message", "이미 대화중인 방");
                status = HttpStatus.CONFLICT;
            }else {
                int code = roomService.isAvailableEnterRoom(body.getRoomNo());
                if (code == 0) {
                    status = HttpStatus.NO_CONTENT;
                } else if (code == 1) {
                    resultMap.put("message", "인원 마감");
                    status = HttpStatus.ACCEPTED;
                } else { // 입장 가능
                    RoomAndRoomUserListResponseDto response = roomService.enterRoom(body);
                    log.debug("roomUsers: {}", response);
                    status = HttpStatus.OK;
                    return new ResponseEntity<RoomAndRoomUserListResponseDto>(response, status);
                }
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map>(resultMap, status);
    }

    @ApiOperation(value = "쫑알룸 나가기", notes = "room no, user id를 요청")
    @PatchMapping(value = "/user")
    private ResponseEntity<?> exitRoom(@RequestBody UpdateRoomRequestDto body) {
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            RoomAndRoomUserListResponseDto response = roomService.exitRoom(body);
            if (response == null) {
                resultMap.put("message", "대기방 폭파");
                status = HttpStatus.ACCEPTED;
            } else if (response.getRoom().getRoom().isAvail() == false) {
                resultMap.put("message", "종료된 방");
                status = HttpStatus.ACCEPTED;
            } else {
                status = HttpStatus.OK;
                return new ResponseEntity<RoomAndRoomUserListResponseDto>(response, status);
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultMap, status);
    }

    @ApiOperation(value = "쫑알룸 대화 시작", notes = "room, room user 상태 변경")
    @PatchMapping(value = "/start")
    private ResponseEntity<?> startConversation(@RequestBody StartEndRoomRequestDto body) {
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            RoomAndRoomUserListResponseDto response = roomService.startConversation(body);
            if (response != null) {
                status = HttpStatus.OK;
                return new ResponseEntity<RoomAndRoomUserListResponseDto>(response, status);
            } else {
                resultMap.put("message", "인원 부족");
                status = HttpStatus.ACCEPTED;
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultMap, status);
    }

    @ApiOperation(value = "대화 종료", notes = "room, room user 상태 변경")
    @PatchMapping(value = "/end")
    private ResponseEntity<?> endConversation(@RequestBody StartEndRoomRequestDto body) {
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            roomService.endConversation(body);
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultMap, status);
    }

}
