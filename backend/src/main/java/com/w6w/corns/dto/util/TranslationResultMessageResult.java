package com.w6w.corns.dto.util;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TranslationResultMessageResult{
    private String srcLangType;
    private String tarLangType;
    private String translatedText;
    private String engineType;
    private String pivot;
    private String dict;
    private String tarDict;
    private String modelVer;
}
