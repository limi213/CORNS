package com.w6w.corns.controller;

import com.w6w.corns.dto.friend.FriendListRequestDto;
import com.w6w.corns.dto.friend.FriendListResponseDto;
import com.w6w.corns.dto.friend.FriendRecvListResponseDto;
import com.w6w.corns.dto.friend.FriendRequestDto;
import com.w6w.corns.service.friend.FriendService;
import com.w6w.corns.util.PageableResponseDto;
import com.w6w.corns.util.code.FriendLogCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/friend")
@Api("친구 컨트롤러")
public class FriendController {

    private final FriendService friendService;

    @ApiOperation("친구 신청")
    @PostMapping("/send")
    public ResponseEntity<?> sendFriend(@RequestBody FriendRequestDto friendRequestDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            friendService.addFriendLog(friendRequestDto, FriendLogCode.FRIEND_LOG_SEND.getCode());
            friendService.sendFriend(friendRequestDto);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("친구 수락")
    @PostMapping("/accept")
    public ResponseEntity<?> acceptFriend(@RequestBody FriendRequestDto friendRequestDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            friendService.addFriendLog(friendRequestDto, FriendLogCode.FRIEND_LOG_ACCEPT.getCode());
            friendService.acceptFriend(friendRequestDto);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("친구 거절")
    @PostMapping("/reject")
    public ResponseEntity<?> rejectFriend(@RequestBody FriendRequestDto friendRequestDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            friendService.addFriendLog(friendRequestDto, FriendLogCode.FRIEND_LOG_REJECT.getCode());
            friendService.rejectFriend(friendRequestDto);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("친구 삭제")
    @PostMapping("/delete")
    public ResponseEntity<?> deleteFriend(@RequestBody FriendRequestDto friendRequestDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            friendService.addFriendLog(friendRequestDto, FriendLogCode.FRIEND_LOG_DELETE.getCode());
            friendService.deleteFriend(friendRequestDto);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("친구 신청 목록")
    @GetMapping("/receive/{userId}")
    public ResponseEntity<?> getFriendReceiveList(@PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            List<FriendRecvListResponseDto> recvList = friendService.getFriendReceiveList(userId);

            if (recvList.isEmpty()) {
                status = HttpStatus.NO_CONTENT;
            } else {
                resultmap.put("recvList", recvList);
                status = HttpStatus.OK;
            }

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("친구 목록")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getFriendList(FriendListRequestDto friendListRequestDto, Pageable pageable, @PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            PageableResponseDto pageableResponseDto = friendService.getFriendList(userId, friendListRequestDto, pageable);

            if (pageableResponseDto.getList().isEmpty()) {
                status = HttpStatus.NO_CONTENT;
            } else {
                status = HttpStatus.OK;
                return new ResponseEntity<PageableResponseDto>(pageableResponseDto, status);
            }

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }
}
