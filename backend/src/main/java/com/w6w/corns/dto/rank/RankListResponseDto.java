package com.w6w.corns.dto.rank;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class RankListResponseDto {
    private int rankType;
    private int ranking;
    private int userId;
    private String nickname;
    private String imgUrl;
    private int levelNo;
    private int value;
}
