package com.w6w.corns.dto.notification;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class ReadNotifyRequestDto {
    private int userId;
    private int read;
}
