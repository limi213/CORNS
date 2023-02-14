package com.w6w.corns.controller;

import com.w6w.corns.dto.conversationlog.RoomBookmarkRequestDto;
import com.w6w.corns.dto.conversationlog.RoomLogFilterDto;
import com.w6w.corns.dto.conversationlog.RoomLogResponseDto;
import com.w6w.corns.dto.conversationlog.RoomMemberDto;
import com.w6w.corns.service.conversationlog.ConversationLogService;
import com.w6w.corns.service.redis.RedisService;
import com.w6w.corns.util.PageableResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/corns-log")
@Api("쫑알로그 컨트롤러")
public class ConversationLogController {

    private final ConversationLogService conversationLogService;

    private final RedisService redisService;

    @ApiOperation("쫑알로그 목록")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getConversationLogList(String baseTime,
                                             String subject,
                                             int minTime,
                                             int maxTime,
                                             String startDate,
                                             String endDate,
                                             String selfScore,
                                             int getThumb,
                                             Pageable pageable,
                                             @PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            //주제 필터 파싱
            StringTokenizer st = new StringTokenizer(subject, " ");
            ArrayList<Integer> subjects = new ArrayList<>();
            while (st.hasMoreTokens()) subjects.add(Integer.parseInt(st.nextToken()));

            //자기평가 점수 필터 파싱
            st = new StringTokenizer(selfScore, " ");
            ArrayList<Integer> selfScores = new ArrayList<>();
            while (st.hasMoreTokens()) selfScores.add(Integer.parseInt(st.nextToken()));

            //시작,종료 날짜 포맷 변경
            startDate = String.format("%s 00:00:00", startDate);
            endDate = String.format("%s 23:59:59", endDate);

            RoomLogFilterDto roomLogFilterDto = RoomLogFilterDto.builder()
                                                    .isOnlyBookmark(false)
                                                    .subjects(subjects)
                                                    .minTime(minTime)
                                                    .maxTime(maxTime)
                                                    .startDate(startDate)
                                                    .endDate(endDate)
                                                    .selfScores(selfScores)
                                                    .getThumb(getThumb)
                                                    .build();

            PageableResponseDto pageableResponseDto = conversationLogService.getLogList(roomLogFilterDto, baseTime, userId, pageable);

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

    @ApiOperation("쫑알로그 상세")
    @GetMapping("/{roomNo}/{userId}")
    public ResponseEntity<?> getConversationLogDetail(@PathVariable int roomNo, @PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            RoomLogResponseDto room = conversationLogService.getRoomLogInfo(roomNo, userId);
            List<RoomMemberDto> memberList = conversationLogService.getMemberResultList(roomNo);

            resultmap.put("room", room);
            resultmap.put("memberList", memberList);
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("즐겨찾기 목록")
    @GetMapping("/bookmark/{userId}")
    public ResponseEntity<?> getBookmarkList(String baseTime, Pageable pageable, @PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            RoomLogFilterDto roomLogFilterDto = RoomLogFilterDto.builder()
                    .isOnlyBookmark(true)
                    .build();

            PageableResponseDto pageableResponseDto = conversationLogService.getLogList(roomLogFilterDto, baseTime, userId, pageable);

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

    @ApiOperation("즐겨찾기 등록/해제")
    @PatchMapping("/bookmark")
    public ResponseEntity<?> changeBookmark(@RequestBody RoomBookmarkRequestDto roomBookmarkRequestDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            conversationLogService.changeBookmark(roomBookmarkRequestDto);
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("스크립트 다운로드")
    @GetMapping("/script/{roomNo}/{userId}")
    public ResponseEntity<?> downloadScript(@PathVariable int roomNo, @PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            HttpHeaders header = new HttpHeaders();
            header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=script.html");
            header.add("Cache-Control", "no-cache, no-store, must-revalidate");
            header.add("Pragma", "no-cache");
            header.add("Expires", "0");

            return ResponseEntity.ok()
                    .headers(header)
                    .contentType(MediaType.parseMediaType("application/octet-stream"))
                    .body(redisService.downloadScriptFile(roomNo, userId));
        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;

            return new ResponseEntity<Map>(resultmap, status);
        }
    }
}
