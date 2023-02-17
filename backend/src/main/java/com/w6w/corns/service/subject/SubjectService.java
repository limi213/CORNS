package com.w6w.corns.service.subject;

import com.w6w.corns.dto.subject.SubjectResponseDto;

import java.util.List;

public interface SubjectService {

    List<SubjectResponseDto> findAll();
    // 각 쫑알룸의 대화 주제 조회
    SubjectResponseDto findById(int subjectNo);

}
