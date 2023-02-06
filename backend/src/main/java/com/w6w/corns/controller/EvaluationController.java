package com.w6w.corns.controller;

import com.w6w.corns.dto.conversationlog.RoomMemberDto;
import com.w6w.corns.dto.evaluation.SelfEvaluationDto;
import com.w6w.corns.dto.evaluation.ThumbLogDto;
import com.w6w.corns.service.conversationlog.ConversationLogService;
import com.w6w.corns.service.evaluation.EvaluationService;
import com.w6w.corns.service.room.RoomService;
import com.w6w.corns.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/evaluation")
@Api("평가 컨트롤러")
public class EvaluationController {

    private final EvaluationService evaluationService;

    private final ConversationLogService conversationLogService;


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
            List<RoomMemberDto> resultList = conversationLogService.getMemberResultList(roomNo);
            resultmap.put("resultList", resultList);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("자기평가 작성")
    @PatchMapping("/self")
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
