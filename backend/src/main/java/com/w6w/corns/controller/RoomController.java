package com.w6w.corns.controller;

import com.w6w.corns.dto.room.request.CreateRoomRequestDto;
import com.w6w.corns.dto.room.request.EnterRoomRequestDto;
import com.w6w.corns.dto.room.request.StartEndRoomRequestDto;
import com.w6w.corns.dto.room.request.UpdateRoomRequestDto;
import com.w6w.corns.dto.room.response.RoomListResponseDto;
import com.w6w.corns.dto.room.response.RoomResponseDto;
import com.w6w.corns.dto.room.response.RoomUserListResponseDto;
import com.w6w.corns.service.room.RoomService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController()
@RequestMapping("room")
public class RoomController {

    private final Logger logger = LoggerFactory.getLogger(RoomController.class);

    @Autowired
    RoomService roomService;

    @ApiOperation(value = "쫑알룸 생성하기", notes = "방 정보와 OpenVidu 관련 정보를 body에 담아서 요청")
    @PostMapping
    private ResponseEntity<?> save(@RequestBody CreateRoomRequestDto body) {
        logger.debug("request body: {}", body);
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            if (roomService.save(body) == 1)
                status = HttpStatus.OK;
            else
                status = HttpStatus.CONFLICT;
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultMap, status);
    }

    @ApiOperation(value = "쫑알쫑알 전체 목록 보기(필터링 추가해야 함)", notes = "page, size, baseTime, subject, minTime, maxTime, showAvail 값을 쿼리 스트링으로 전달")
    @GetMapping
    private ResponseEntity<?> getAllRooms() {

        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            List<RoomListResponseDto> rooms = roomService.findAll();
            logger.debug("rooms: {}", rooms);
            if (rooms.isEmpty()) {
                status = HttpStatus.NO_CONTENT;
            } else {
                resultMap.put("rooms", rooms);
                status = HttpStatus.OK;
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
            RoomResponseDto room = roomService.findRoomByRoomNo(roomNo);
            logger.debug("room: {}", room);
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
            List<RoomUserListResponseDto> roomUsers = roomService.findRoomUserByRoomNo(roomNo);
            logger.debug("roomUsers: {}", roomUsers);
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
        logger.debug("body: {}", body);
        Map resultMap = new HashMap<>();
        HttpStatus status;

        try {
            if (!roomService.isNotUserInConversation(body.getUserId())) {
                resultMap.put("message", "이미 대화 중인 방");
                status = HttpStatus.CONFLICT;
            } else {
                int code = roomService.isAvailableEnterRoom(body.getRoomNo());
                if (code == 0) {
                    status = HttpStatus.NO_CONTENT;
                } else if (code == 1) {
                    resultMap.put("message", "인원 마감");
                    status = HttpStatus.ACCEPTED;
                } else { // 입장 가능
                    List<RoomUserListResponseDto> roomUsers = roomService.enterRoom(body);
                    logger.debug("roomUsers: {}", roomUsers);
                    resultMap.put("room", roomUsers);
                    status = HttpStatus.OK;
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
            roomService.exitRoom(body);
            status = HttpStatus.OK;
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
            int code = roomService.startConversation(body);
            if (code == 1) {
                status = HttpStatus.OK;
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
