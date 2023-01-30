package com.w6w.corns.service.subject;

import com.w6w.corns.dto.user.subject.SubjectResponseDto;

import java.util.List;

public interface SubjectService {

    List<SubjectResponseDto> findAll();

}
