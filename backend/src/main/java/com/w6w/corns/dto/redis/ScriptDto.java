package com.w6w.corns.dto.redis;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ScriptDto {
    int userId;
    String sentence;
    String time;
}
