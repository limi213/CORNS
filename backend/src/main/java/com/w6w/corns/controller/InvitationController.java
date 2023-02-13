package com.w6w.corns.controller;

import com.w6w.corns.dto.invitelog.InviteRoomListResponseDto;
import com.w6w.corns.dto.invitelog.InviteRoomRequestDto;
import com.w6w.corns.service.invitation.InvitationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invitation")
@Api("초대 컨트롤러")
public class InvitationController {

    final private InvitationService invitationService;

    @ApiOperation("쫑알룸 초대 목록")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getInviteRoomList(@PathVariable int userId) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            List<InviteRoomListResponseDto> inviteList = invitationService.getInviteRoomList(userId);

            if (inviteList.isEmpty()) {
                status = HttpStatus.NO_CONTENT;
            } else {
                resultmap.put("inviteList", inviteList);
                status = HttpStatus.OK;
            }

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("쫑알룸 초대")
    @PostMapping("/")
    public ResponseEntity<?> inviteRoom(@RequestBody InviteRoomRequestDto inviteRoomRequestDto) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            invitationService.addInviteLog(inviteRoomRequestDto);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }

    @ApiOperation("쫑알룸 초대 로그 삭제")
    @DeleteMapping("/{inviteLogNo}")
    public ResponseEntity<?> removeInviteLog(@PathVariable int inviteLogNo) {
        Map resultmap = new HashMap<>();
        HttpStatus status;

        try {
            invitationService.removeInviteLog(inviteLogNo);
            status = HttpStatus.OK;

        } catch (Exception e) {
            resultmap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map>(resultmap, status);
    }
}
