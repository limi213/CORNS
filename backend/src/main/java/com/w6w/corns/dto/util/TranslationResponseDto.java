package com.w6w.corns.dto.util;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@ApiModel(value="번역결과")
public class TranslationResponseDto {
    // 번역할 원본 언어의 언어 코드
    private String srcLangType;
    // 번역한 목적 언어의 언어 코드
    private String tarLangType;
    // 번역된 텍스트
    private String translatedText;
}
