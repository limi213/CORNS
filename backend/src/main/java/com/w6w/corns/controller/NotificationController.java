package com.w6w.corns.controller;

import com.w6w.corns.dto.notification.ReadNotifyRequestDto;
import com.w6w.corns.service.redis.RedisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
@Api("알림 컨트롤러")
public class NotificationController {

    private final RedisService redisService;
    
    @ApiOperation("새 알림 여부 확인 (친구 신청)")
    @GetMapping("/friend/{userId}")
    public ResponseEntity<?> isExistFriendNotify(@PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            resultmap.put("isExist", redisService.isExistNewNotify(userId, 0));
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("새 알림 여부 확인 (쫑알룸 초대)")
    @GetMapping("/room/{userId}")
    public ResponseEntity<?> isExistRoomNotify(@PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            resultmap.put("isExist", redisService.isExistNewNotify(userId, 1));
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("알림 읽음 처리")
    @PutMapping("/")
    public ResponseEntity<?> readNotify(@RequestBody ReadNotifyRequestDto readNotifyRequestDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            redisService.updateNotify(readNotifyRequestDto.getUserId(), readNotifyRequestDto.getRead(), false);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }
}
