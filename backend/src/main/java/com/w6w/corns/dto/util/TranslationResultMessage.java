package com.w6w.corns.dto.util;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TranslationResultMessage{
    public TranslationResultMessageResult result;
}