package com.w6w.corns.dto.word.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알단어 수정 요청 정보")
public class ModifyWordRequestDto {

    private int wordSq;

    private String wordEng;

    private String wordKor;


}
