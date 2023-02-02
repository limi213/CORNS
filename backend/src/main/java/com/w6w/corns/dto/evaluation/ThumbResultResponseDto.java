package com.w6w.corns.dto.evaluation;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class ThumbResultResponseDto {
    private int userId;
    private String nickname;
    private String imgUrl;
    private int thumbCnt;
}
