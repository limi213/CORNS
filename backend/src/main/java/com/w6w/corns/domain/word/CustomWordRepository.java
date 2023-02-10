package com.w6w.corns.domain.word;

import com.w6w.corns.util.PageableResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface CustomWordRepository {

    // 쫑알단어 리스트 (페이징)
    Slice<Word> searchBySlice(int userId, String baseTime, int wordStatus, Pageable pageable);
}
