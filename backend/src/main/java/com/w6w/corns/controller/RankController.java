package com.w6w.corns.controller;

import com.w6w.corns.dto.rank.RankListResponseDto;
import com.w6w.corns.service.rank.RankService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rank")
@Api("알맹이랭킹 컨트롤러")
public class RankController {

    private final RankService rankService;

    @ApiOperation("랭킹 목록")
    @GetMapping("/{type}")
    public ResponseEntity<?> getRankList(@PathVariable int type) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            List<RankListResponseDto> rankList = rankService.getRankList(type);

            if (rankList.isEmpty()) {
                status = HttpStatus.NO_CONTENT;
            } else {
                resultmap.put("rankList", rankList);
                status = HttpStatus.OK;
            }

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("각 랭킹 1등 목록")
    @GetMapping("/hof")
    public ResponseEntity<?> getRankHOF() {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            List<RankListResponseDto> rankList = rankService.getRankHOF();

            if (rankList.isEmpty()) {
                status = HttpStatus.NO_CONTENT;
            } else {
                resultmap.put("rankList", rankList);
                status = HttpStatus.OK;
            }

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }
}
