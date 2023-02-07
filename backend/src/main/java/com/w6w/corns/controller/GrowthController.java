package com.w6w.corns.controller;

import com.w6w.corns.service.growth.GrowthService;
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

    private ResponseEntity<?> exceptionHandling(Exception e) {
        Map<String, String> map = new HashMap<>();
        map.put("message", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ApiOperation(value = "출석률바", notes = "쫑알쫑알 페이지에서 출석률바 보여줌")
    @GetMapping("/room/{userId}")
    public ResponseEntity<?> showAttendBar(@PathVariable int userId) {

        try {
            log.debug("userId : {}",userId);
            Map<String, Object> result = new HashMap<>();

            //출석률 -> 날짜를 한달 기준으로 얼마나 출석했는지 보여줌, 하루에 한 번만 기록
            int value = growthService.calAttendanceRate(userId);

            result.put("attendanceRate", value);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "경험치 레벨바", notes = "경험치 페이지, 쫑알쫑일 페이지 내에서 회원의 레벨바를 보여줌")
    @GetMapping("/exp/bar/{userId}")
    public ResponseEntity<?> showLevelBar(@PathVariable int userId) {

        try {
            return new ResponseEntity<>(growthService.getUserLevel(userId), HttpStatus.OK);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

     @ApiOperation(value = "경험치 상위 백분위값", notes = "경험치 페이지 내에서 회원의 경험치 백분위를 보여줌")
        @GetMapping("/exp/{userId}")
        public ResponseEntity<?> showPercentile(@PathVariable int userId) {

            try {
                Map<String, Object> result = new HashMap<>();

                //경험치 상위 백분위
                int percentile = growthService.calExpPercentile(userId);

                result.put("percentile", percentile);
                return new ResponseEntity<>(result, HttpStatus.OK);

            } catch (Exception e) {
                log.error(e.getMessage());
                return exceptionHandling(e);
            }
        }

    @ApiOperation(value = "경험치 목록", notes = "회원의 경험치 전체 목록을 최신순으로 반환 + 페이지네이션")
    @GetMapping("/exp/list/{userId}")
    public ResponseEntity<?> listExp(@PathVariable int userId,
                                     @PageableDefault(sort = "expLogSq", direction = Sort.Direction.DESC) Pageable pageable,
                                     @RequestParam String baseTime) {

        try {
            PageableResponseDto responseDto = growthService.getExpLogList(userId, pageable, baseTime);

            if (responseDto != null && responseDto.getList().size() > 0)
                return new ResponseEntity<>(responseDto, HttpStatus.OK);
            else return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            log.error(e.getMessage());
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "회원 지표 보기", notes = "type : 1 - 최근 일주일의 일별 대화량, 2 - 주제 비율, 3 - 일일 경험치 획득량")
    @GetMapping("/indicator/{userId}/{type}")
    public ResponseEntity<?> showGraph(@PathVariable int userId, @PathVariable int type) {

        log.debug("userId : {}, type : {}", userId, type);

        Map<String, Object> result = new HashMap<>();
        try {
            //type 1 최근 일주일 일별 대화량
            if (type == 1){
                result.put("dailySpeakingByWeek", growthService.calDailySpeakingTotalByWeek(userId));
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
            //type 2 대화 주제 비율
            else if (type == 2) {
                result.put("subjectRatio", growthService.countBySubject(userId));
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
            //type 3 일일 경험치 획득량(지난주, 이번주 비교)
            else if (type == 3)
                return new ResponseEntity<>(growthService.calDailyGainedExp(userId), HttpStatus.OK);

            else
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }
}