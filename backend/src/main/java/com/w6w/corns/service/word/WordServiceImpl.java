package com.w6w.corns.service.word;

import com.w6w.corns.domain.word.Word;
import com.w6w.corns.domain.word.WordRepository;
import com.w6w.corns.dto.word.request.CreateWordRequestDto;
import com.w6w.corns.dto.word.request.ModifyWordRequestDto;
import com.w6w.corns.dto.word.request.UpdateWordStatusRequestDto;
import com.w6w.corns.dto.word.response.WordReponseDto;
import com.w6w.corns.util.PageableResponseDto;
import com.w6w.corns.util.code.WordCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordServiceImpl implements WordService {

    private final WordRepository wordRepository;

    // 쫑알단어 리스트 (페이징)
    @Override
    public PageableResponseDto searchBySlice(String baseTime, int wordStatus, Pageable pageable) {
        Slice<Word> slice = wordRepository.searchBySlice(baseTime, wordStatus, pageable);
        List<WordReponseDto> words = slice.getContent().stream()
                .map(m -> WordReponseDto.builder()
                        .wordSq(m.getWordSq())
                        .wordEng(m.getWordEng())
                        .wordKor(m.getWordKor())
                        .build())
                .collect(Collectors.toList());
        return new PageableResponseDto(slice.hasNext(), words);
    }

    // 쫑알단어 추가
    @Override
    @Transactional
    public WordReponseDto saveWord(CreateWordRequestDto request) {
        Word word = request.toEntity();
        word.setWordCd(WordCode.WORD_TODO.getCode());
        wordRepository.save(word);
        return WordReponseDto.builder()
                .wordSq(word.getWordSq())
                .wordEng(word.getWordEng())
                .wordKor(word.getWordKor())
                .build();
    }

    // 쫑알단어 수정
    @Override
    @Transactional
    public WordReponseDto modifyWord(ModifyWordRequestDto request) {
        Word word = wordRepository.findById(request.getWordSq()).get();
        word.setWordEng(request.getWordEng());
        word.setWordKor(request.getWordKor());
        wordRepository.save(word);

        return WordReponseDto.builder()
                .wordSq(word.getWordSq())
                .wordEng(word.getWordEng())
                .wordKor(word.getWordKor())
                .build();
    }

    // 쫑알단어 상태 변경
    @Override
    @Transactional
    public void updateWordStatus(UpdateWordStatusRequestDto request) {
        Word word = wordRepository.findById(request.getWordSq()).get();
        if (request.getStatus() == 1) {
            word.setWordCd(WordCode.WORD_TODO.getCode());
        } else if (request.getStatus() == 2) {
            word.setWordCd(WordCode.WORD_DONE.getCode());
        }
        wordRepository.save(word);
    }

    // 쫑알단어 삭제
    @Override
    @Transactional
    public void deleteWord(int wordSq) {
        wordRepository.deleteById(wordSq);
    }
}
