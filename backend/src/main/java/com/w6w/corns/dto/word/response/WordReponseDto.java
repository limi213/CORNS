package com.w6w.corns.dto.word.response;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알단어 응답 정보")
public class WordReponseDto {

    private int wordSq;

    private String wordEng;

    private String wordKor;

}
