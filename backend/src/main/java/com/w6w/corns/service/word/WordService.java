package com.w6w.corns.service.word;

import com.w6w.corns.dto.word.request.CreateWordRequestDto;
import com.w6w.corns.dto.word.request.ModifyWordRequestDto;
import com.w6w.corns.dto.word.request.UpdateWordStatusRequestDto;
import com.w6w.corns.dto.word.response.WordReponseDto;
import com.w6w.corns.util.PageableResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface WordService {

    // 쫑알단어 리스트 (페이징)
    public PageableResponseDto searchBySlice(int userId, String baseTime, int wordStatus, Pageable pageable);
    // 쫑알단어 추가
    public WordReponseDto saveWord(CreateWordRequestDto request);
    // 쫑알단어 수정
    public WordReponseDto modifyWord(ModifyWordRequestDto request);
    // 쫑알단어 상태 변경
    public void updateWordStatus(List<UpdateWordStatusRequestDto> request);
    // 쫑알단어 삭제
    public void deleteWord(int wordSq);

}
