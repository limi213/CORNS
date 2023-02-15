package com.w6w.corns.service.conversationlog;

import com.w6w.corns.domain.room.Room;
import com.w6w.corns.domain.room.RoomRepository;
import com.w6w.corns.domain.roomuser.RoomUser;
import com.w6w.corns.domain.roomuser.RoomUserRepository;
import com.w6w.corns.domain.selfevaluation.SelfEvaluation;
import com.w6w.corns.domain.selfevaluation.SelfEvaluationPK;
import com.w6w.corns.domain.selfevaluation.SelfEvaluationRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.conversationlog.RoomBookmarkRequestDto;
import com.w6w.corns.dto.conversationlog.RoomLogFilterDto;
import com.w6w.corns.dto.conversationlog.RoomLogResponseDto;
import com.w6w.corns.dto.conversationlog.RoomMemberDto;
import com.w6w.corns.service.room.RoomService;
import com.w6w.corns.util.PageableResponseDto;
import com.w6w.corns.util.code.RoomUserCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationLogServiceImpl implements ConversationLogService {

    private final RoomService roomService;

    private final UserRepository userRepo;

    private final RoomUserRepository roomUserRepo;

    private final RoomRepository roomRepo;

    private final SelfEvaluationRepository selfEvaluationRepo;

    //유저가 참여했던 쫑알로그 리스트 조회
    @Override
    public PageableResponseDto getLogList(RoomLogFilterDto roomLogFilterDto, String baseTime, int userId, Pageable pageable) {
        Slice<RoomLogResponseDto> logList = roomUserRepo.findLogByUserIdAndFilter(roomLogFilterDto, baseTime, userId, pageable);
        return new PageableResponseDto(logList.hasNext(), logList.getContent());
    }

    //대화(방) 상세정보 조회
    @Override
    public RoomLogResponseDto getRoomLogInfo(int roomNo, int userId) {
        RoomLogResponseDto roomLogResponseDto;
        RoomUser roomUser = roomUserRepo.findByUserIdAndRoomNo(userId, roomNo);

        if (roomUser.getRoomUserCd() == RoomUserCode.ROOM_USER_END.getCode()) {
            Room room = roomRepo.findById(roomNo).get();
            SelfEvaluation selfEvaluation = selfEvaluationRepo.findById(SelfEvaluationPK.builder()
                                                                                .roomNo(roomNo)
                                                                                .userId(userId)
                                                                                .build()).get();

            roomLogResponseDto = RoomLogResponseDto.builder()
                                            .roomNo(roomNo)
                                            .isBookmark((roomUser.getBookmarkYN()=='Y')?true:false)
                                            .subject(room.getSubjectNo())
                                            .title(room.getTitle())
                                            .startTime(room.getStartTm().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                                            .time(room.getTime())
                                            .member(room.getCurrentMember())
                                            .scriptUrl(room.getScriptUrl())
                                            .selfScore(selfEvaluation.getScore())
                                            .selfDesc(selfEvaluation.getDescription())
                                            .thumbCnt(roomUser.getThumbCnt())
                                            .canRead(true)
                                            .build();
        } else {
            roomLogResponseDto = RoomLogResponseDto.builder()
                                            .roomNo(roomNo)
                                            .canRead(false)
                                            .build();
        }

        return roomLogResponseDto;
    }

    //참여자 대화 결과 리스트 조회
    @Override
    public List<RoomMemberDto> getMemberResultList(int roomNo) {
        int time = roomRepo.findById(roomNo).get().getTime();   //대화 진행시간
        List<Integer> userList = roomService.getUserList(roomNo);   //대화 참여자 리스트
        List<RoomMemberDto> resultList = new ArrayList<>();

        for (int userId : userList) {
            User user = userRepo.findByUserId(userId);
            RoomUser roomUser = roomUserRepo.findByUserIdAndRoomNo(userId, roomNo);
            resultList.add(RoomMemberDto.builder()
                            .userId(userId)
                            .nickname(user.getNickname())
                            .imgUrl(user.getImgUrl())
                            .thumbCnt(roomUser.getThumbCnt())
                            .speaking(getSpeakingPhrases(roomUser.getSpeakingSec(), time))
                            .scriptUrl(roomUser.getScriptUrl())
                            .build());
        }

        return resultList;
    }

    public String getSpeakingPhrases(int speakingSec, int time) {
        return String.format("%d분 %d초(%d%%)", speakingSec/60, speakingSec%60, (int)(((double)speakingSec/(60*time))*100));
    }

    //즐겨찾기 등록/해제
    @Override
    public void changeBookmark(RoomBookmarkRequestDto bookmarkRequestDto) {
        RoomUser roomUser = roomUserRepo.findByUserIdAndRoomNo(bookmarkRequestDto.getUserId(), bookmarkRequestDto.getRoomNo());
        roomUser.setBookmarkYN(bookmarkRequestDto.isDoRegister());
        roomUserRepo.save(roomUser);
    }

}
