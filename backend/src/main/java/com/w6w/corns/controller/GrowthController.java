package com.w6w.corns.controller;

import com.w6w.corns.dto.level.LevelDto;
import com.w6w.corns.dto.user.UserDetailResponseDto;
import com.w6w.corns.service.friend.FriendService;
import com.w6w.corns.service.growth.GrowthService;
import com.w6w.corns.service.user.UserService;
import com.w6w.corns.util.PageableResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/growth")
@Api("성장기록 컨트롤러")
public class GrowthController {

    private final GrowthService growthService;
    private final FriendService friendService;
    private final UserService userService;

    private ResponseEntity<?> exceptionHandling(Exception e) {
        Map<String, String> map = new HashMap<>();
        map.put("message", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ApiOperation(value = "쫑알쫑알 경험치, 출석률바", notes = "쫑알쫑알 페이지에서 회원의 경험치와 출석률바 보여줌")
    @GetMapping("/room/{userId}")
    public ResponseEntity<?> showExpAndAttendBar(@PathVariable int userId) {

        try {
            Map<String, Object> result = new HashMap<>();

            //레벨바 -> getUserLevel 재사용
            LevelDto level = growthService.getUserLevel(userId);

            //출석률 -> 날짜를 한달 기준으로 얼마나 출석했는지 보여줌, 하루에 한 번만 기록
            int value = growthService.calAttendanceRate(userId);

            result.put("level", level);
            result.put("attendanceRate", value);
            return new ResponseEntity<>(result, HttpStatus.OK);

        }catch(Exception e){
            return exceptionHandling(e);
        }
    }
    @ApiOperation(value = "경험치 레벨바", notes = "경험치 페이지 내에서 회원의 경험치 백분위와 레벨바를 보여줌")
    @GetMapping("/exp/{userId}")
    public ResponseEntity<?> showLevelBar(@PathVariable int userId){

        try {
            Map<String, Object> result = new HashMap<>();

            //경험치 상위 백분위
            int percentile = growthService.calExpPercentile(userId);

            //레벨바
            LevelDto level = growthService.getUserLevel(userId);

            result.put("percentile", percentile);
            result.put("level", level);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "경험치 목록", notes = "회원의 경험치 전체 목록을 최신순으로 반환 + 페이지네이션")
    @GetMapping("/exp/list/{userId}")
    public ResponseEntity<?> listExp(@PathVariable int userId,
                                     @PageableDefault(sort = "expLogSq", direction = Sort.Direction.DESC)  Pageable pageable,
                                     @RequestParam String baseTime){

        try {
            PageableResponseDto responseDto = growthService.getExpLogList(userId, pageable, baseTime);

            if(responseDto != null && responseDto.getList().size() > 0) return new ResponseEntity<>(responseDto, HttpStatus.OK);
            else return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "알맹 상세 정보", notes = "from이 to의 상세정보를 봤을 때의 정보와 친구 관계를 반환")
    @GetMapping("/{fromId}/{toId}")
    public ResponseEntity<?> showDetail(@PathVariable int fromId, @PathVariable int toId){

        try {
            //유저정보 불러오기
            UserDetailResponseDto responseDto = userService.getUser(toId);

            //관계 반환
            int relation = friendService.getFriendRelation(fromId, toId);

            Map<String, Object> result = new HashMap<>();
            result.put("toUser", responseDto);
            result.put("relation", relation);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @GetMapping("/indicator/{userId}/{type}")
    public ResponseEntity<?> showGraph(@PathVariable int userId, @PathVariable int type){

        //type 1 최근 일주일 일별 대화량, 지난주와 비교


        //type 2 대화 주제 비율


        //type 3


        return null;
    }
}
