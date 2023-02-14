package com.w6w.corns.dto.util;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@ApiModel(value="번역")
public class TranslationDto {
    private String text;
    private String source;
    private String target;
}
