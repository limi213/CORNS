package com.w6w.corns.dto.redis;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SaveScriptRequestDto {
    int roomNo;
    int userId;
    String sentence;
    String time;
}
