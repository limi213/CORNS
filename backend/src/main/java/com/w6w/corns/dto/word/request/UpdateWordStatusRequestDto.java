package com.w6w.corns.dto.word.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="쫑알단어 상태 업데이트 요청 정보")
public class UpdateWordStatusRequestDto {

    private int WordSq;

    private int status;

}
