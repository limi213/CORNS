package com.w6w.corns.util;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@ApiModel(value="페이징 응답 정보")
public class PageableResponseDto {

    private boolean hasNext;

    private List<?> list;

}