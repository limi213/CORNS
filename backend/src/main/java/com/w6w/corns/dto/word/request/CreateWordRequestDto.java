package com.w6w.corns.dto.word.request;

import com.w6w.corns.domain.word.Word;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알단어 생성 요청 정보")
public class CreateWordRequestDto {

    private int userId;

    private String wordEng;

    private String wordKor;

    public Word toEntity() {
        return Word.builder()
                .userId(userId)
                .wordEng(wordEng)
                .wordKor(wordKor)
                .build();
    }

}
