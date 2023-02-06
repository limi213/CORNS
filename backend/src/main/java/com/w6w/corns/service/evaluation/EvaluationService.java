package com.w6w.corns.service.evaluation;

import com.w6w.corns.dto.conversationlog.RoomMemberDto;
import com.w6w.corns.dto.evaluation.SelfEvaluationDto;
import com.w6w.corns.dto.evaluation.ThumbLogDto;

import java.util.List;

public interface EvaluationService {
    //따봉멤버 투표
    void voteThumbMember(ThumbLogDto thumbLogDto);
    //해당 참여자가 받은 따봉투표 수
    int getThumbResult(int roomNo, int toUserId);
    //자기평가 작성
    void writeSelfEvaluation(SelfEvaluationDto selfEvalDto);

}
