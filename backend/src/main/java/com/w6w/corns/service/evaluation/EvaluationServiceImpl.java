package com.w6w.corns.service.evaluation;

import com.w6w.corns.domain.selfevaluation.SelfEvaluationRepository;
import com.w6w.corns.domain.thumblog.ThumbLogRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.evaluation.SelfEvaluationDto;
import com.w6w.corns.dto.evaluation.ThumbLogDto;
import com.w6w.corns.dto.evaluation.ThumbResultResponseDto;
import com.w6w.corns.service.room.RoomService;
import com.w6w.corns.service.room.RoomServiceImpl;
import com.w6w.corns.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    RoomService roomService;

    @Autowired
    UserRepository userRepo;

    @Autowired
    ThumbLogRepository thumbLogRepo;

    @Autowired
    SelfEvaluationRepository selfEvaluationRepo;

    //따봉멤버 투표
    @Override
    public void voteThumbMember(ThumbLogDto thumbLogDto) {
        thumbLogRepo.save(thumbLogDto.toEntity());
    }

    //해당 참여자가 받은 따봉투표 수
    @Override
    public int getThumbResult(int roomNo, int toUserId) {
        return (int)thumbLogRepo.countByRoomNoAndToUserId(roomNo, toUserId);
    }

    //따봉멤버 결과 리스트
    @Override
    public List<ThumbResultResponseDto> getThumbResultList(int roomNo) {
        List<Integer> userList = roomService.getUserList(roomNo);   //대화 참여자 리스트
        List<ThumbResultResponseDto> resultList = new ArrayList<>();

        for (int userId : userList) {
            User user = userRepo.findByUserId(userId);
            resultList.add(ThumbResultResponseDto.builder()
                                .userId(userId)
                                .nickname(user.getNickname())
                                .imgUrl(user.getImgUrl())
                                .thumbCnt(getThumbResult(roomNo, userId))
                                .build());
        }

        return resultList;
    }

    //자기평가 등록
    @Override
    public void writeSelfEvaluation(SelfEvaluationDto selfEvalDto) {
        selfEvaluationRepo.save(selfEvalDto.toEntity());
    }

}
