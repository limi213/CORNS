package com.w6w.corns.service.evaluation;

import com.w6w.corns.domain.room.Room;
import com.w6w.corns.domain.room.RoomRepository;
import com.w6w.corns.domain.roomuser.RoomUser;
import com.w6w.corns.domain.roomuser.RoomUserRepository;
import com.w6w.corns.domain.selfevaluation.SelfEvaluation;
import com.w6w.corns.domain.selfevaluation.SelfEvaluationPK;
import com.w6w.corns.domain.selfevaluation.SelfEvaluationRepository;
import com.w6w.corns.domain.thumblog.ThumbLogRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.conversationlog.RoomMemberDto;
import com.w6w.corns.dto.evaluation.SelfEvaluationDto;
import com.w6w.corns.dto.evaluation.ThumbLogDto;
import com.w6w.corns.dto.explog.ExpLogRequestDto;
import com.w6w.corns.service.growth.GrowthService;
import com.w6w.corns.service.room.RoomService;
import com.w6w.corns.util.code.ExpCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EvaluationServiceImpl implements EvaluationService {

    private final GrowthService growthService;

    private final UserRepository userRepo;

    private final RoomUserRepository roomUserRepo;

    private final ThumbLogRepository thumbLogRepo;

    private final SelfEvaluationRepository selfEvaluationRepo;

    //따봉멤버 투표
    @Override
    public void voteThumbMember(ThumbLogDto thumbLogDto) {
        User user = userRepo.findById(thumbLogDto.getToUserId()).get();
        //user thumb_total 갱신해야됨
        RoomUser roomUser = roomUserRepo.findByUserIdAndRoomNo(thumbLogDto.getToUserId(), thumbLogDto.getRoomNo());
        roomUser.setThumbCnt(roomUser.getThumbCnt()+1);
        roomUserRepo.save(roomUser);
        thumbLogRepo.save(thumbLogDto.toEntity());
        growthService.giveExp(ExpLogRequestDto.builder()
                                .userId(thumbLogDto.getToUserId())
                                .gainExp(7)
                                .expCd(ExpCode.EXP_THUMB.getCode())
                                .build());
    }

    //해당 참여자가 받은 따봉투표 수
    @Override
    public int getThumbResult(int roomNo, int toUserId) {
        return roomUserRepo.findByUserIdAndRoomNo(toUserId, roomNo).getThumbCnt();
    }

    //자기평가 작성
    @Override
    public void writeSelfEvaluation(SelfEvaluationDto selfEvalDto) {
        SelfEvaluation selfEvaluation = selfEvaluationRepo.findById(SelfEvaluationPK.builder()
                                                                        .roomNo(selfEvalDto.getRoomNo())
                                                                        .userId(selfEvalDto.getUserId())
                                                                        .build()).get();
        selfEvaluation.setScore(selfEvalDto.getScore());
        selfEvaluation.setDescription(selfEvalDto.getDescription());
        selfEvaluationRepo.save(selfEvaluation);
    }

}
