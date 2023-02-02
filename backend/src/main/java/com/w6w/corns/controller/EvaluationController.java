package com.w6w.corns.controller;

import com.w6w.corns.domain.user.User;
import com.w6w.corns.dto.evaluation.SelfEvaluationDto;
import com.w6w.corns.dto.evaluation.ThumbResultResponseDto;
import com.w6w.corns.dto.evaluation.ThumbLogDto;
import com.w6w.corns.service.evaluation.EvaluationService;
import com.w6w.corns.service.room.RoomService;
import com.w6w.corns.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/evaluation")
@Api("평가 컨트롤러")
public class EvaluationController {

    @Autowired
    EvaluationService evaluationService;

    @Autowired
    RoomService roomService;

    @Autowired
    UserService userService;


    @ApiOperation("따봉멤버 투표")
    @PostMapping("/thumb")
    public ResponseEntity<?> voteThumbMember(@RequestBody ThumbLogDto thumbLogDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            evaluationService.voteThumbMember(thumbLogDto);
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("따봉멤버 결과")
    @GetMapping("/thumb/{roomNo}")
    public ResponseEntity<?> getThumbResult(@PathVariable int roomNo) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            List<ThumbResultResponseDto> resultList = evaluationService.getThumbResultList(roomNo);
            resultmap.put("resultList", resultList);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("자기평가 등록")
    @PostMapping("/self")
    public ResponseEntity<?> writeSelfEvaluation(@RequestBody SelfEvaluationDto selfEvalDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            evaluationService.writeSelfEvaluation(selfEvalDto);
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }
}
