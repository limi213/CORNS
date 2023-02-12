package com.w6w.corns.controller;

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
    
    @ApiOperation("새 알림 여부 확인")
    @GetMapping("/{userId}")
    public ResponseEntity<?> isExistNotify(@PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            resultmap.put("isExist", redisService.isExistNewNotify(userId));
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("알림 읽음 처리")
    @PostMapping("/{userId}")
    public ResponseEntity<?> readNotify(@PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            redisService.updateNotify(userId, false);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }
}
