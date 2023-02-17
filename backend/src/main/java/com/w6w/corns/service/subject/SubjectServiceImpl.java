package com.w6w.corns.service.subject;

import com.w6w.corns.domain.subject.Subject;
import com.w6w.corns.domain.subject.SubjectRepository;
import com.w6w.corns.dto.subject.SubjectResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;

    @Override
    public List<SubjectResponseDto> findAll() {
        List<Subject> subjects = subjectRepository.findAll();
        if (subjects.isEmpty()) return null;

        return subjects.stream()
                .map(m -> SubjectResponseDto.builder()
                        .subjectNo(m.getSubjectNo())
                        .imgUrl(m.getImgUrl())
                        .value(m.getValue())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public SubjectResponseDto findById(int subjectNo) {
        Subject subject = subjectRepository.findById(subjectNo).get();
        return SubjectResponseDto.builder()
                .subjectNo(subject.getSubjectNo())
                .imgUrl(subject.getImgUrl())
                .value(subject.getValue())
                .build();
    }
}
