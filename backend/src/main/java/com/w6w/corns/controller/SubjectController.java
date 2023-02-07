package com.w6w.corns.controller;

import com.w6w.corns.dto.subject.SubjectResponseDto;
import com.w6w.corns.service.subject.SubjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/subject")
@Api("대화 주제 컨트롤러")
public class SubjectController {

    private final SubjectService subjectService;

    @ApiOperation(value = "대화 주제 리스트", notes = "대화 주제 번호, 이미지, 주제명을 반환")
    @GetMapping
    private ResponseEntity<?> getList() {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            List<SubjectResponseDto> subjects = subjectService.findAll();
            log.debug("subjects: {}", subjects);

            if (subjects.isEmpty()) {
                status = HttpStatus.NO_CONTENT;
            } else {
                resultmap.put("subjects", subjects);
                status = HttpStatus.OK;
            }

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

}
