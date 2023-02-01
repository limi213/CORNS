package com.w6w.corns.util;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="페이징 요청 정보")
public class MyPageable {

    private Integer page;

    private Integer size;

    private List<String> sort;
}
